import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { client } from "../utils/dbConnect.js";
import { private_resolvers_guard } from "../middleware/private_resolvers_guard.js";

// GET SINGLE USER QUERY
export const get_user_resolver = async (parent, args, contextValue) => {
  // call the private resolvers guard with the context value
  // if there's no decoded user details, then it'll throw errors accordingly and terminate get user operation
  const decoded_user = await private_resolvers_guard(contextValue);

  // extract the user's id from the decoded user
  const decoded_user_id = decoded_user.user_id;
  const get_user_query = "SELECT * FROM job_seeker WHERE user_id = $1";
  const user_jobs_query = "SELECT * FROM job WHERE user_id = $1";

  // If the request doesn't contain user id throw an error
  if (!decoded_user_id) {
    throw new GraphQLError("User's ID is required to fetch a single user");
  }

  try {
    // connect to the database
    await client.connect();

    // find the user with the provided user ID
    const found_user_res = await client.query(get_user_query, [
      decoded_user_id,
    ]);

    // if the user exists, populate the user's jobs field with the found jobs
    if (found_user_res.rows.length > 0) {
      const user_jobs_res = await client.query(user_jobs_query, [
        decoded_user_id,
      ]);

      const user = found_user_res.rows[0];
      user.jobs = user_jobs_res.rows;

      // close the db connection
      // await client.end();

      return user;
    } else {
      // the user with the provided id isn't found in the database
      throw new GraphQLError("Sorry, user does not exist");
    }
  } catch (error) {
    // server couldn't process the request as expected
    console.log(error);

    return new GraphQLError(error?.message);
  }
};

// REGISTER THE USER MUTATION
export const handle_user_register = async (
  _,
  { fullname, email, password }
) => {
  const email_exists_query = "SELECT user_id FROM job_seeker WHERE email = $1";
  const register_user_query =
    "INSERT INTO job_seeker (fullname, email, password) VALUES ($1, $2, $3) RETURNING user_id, fullname, email";

  // ensure the request has all the required fields
  if (!fullname || !email || !password) {
    throw new GraphQLError(
      "Fullname, email and password are required for registration"
    );
  }

  try {
    // establish db connection
    await client.connect();

    // check if there's an existing user with the provided email
    const user_with_email_res = await client.query(email_exists_query, [email]);

    if (user_with_email_res.rows.length < 1) {
      // no similar user, so encrypt the new user's password and save them
      password = await bcrypt.hash(password, 10);

      const new_user_res = await client.query(register_user_query, [
        fullname,
        email,
        password,
      ]);

      const registered_user = new_user_res.rows[0];

      // disconnect database
      // await client.end();

      return registered_user;
    } else {
      // there's a user with similar email
      throw new GraphQLError("Seems like this user already exists");
    }
  } catch (error) {
    // server couldn't process the request as expected
    console.log(error);

    return new GraphQLError(error?.message);
  }
};

// USER SIGN IN MUTATION
export const handle_user_signin = async (_, { email, password }) => {
  const check_user_email_query = "SELECT * FROM job_seeker WHERE email = $1";

  // the email and password fields are required
  if (!email || !password) {
    throw new GraphQLError("Please provide email and password to sign in");
  }

  try {
    // create database connection
    await client.connect();

    // make sure the user with given email exists
    const user_exists_res = await client.query(check_user_email_query, [email]);
    // after the response we don't need the db anymore, disconnect
    // await client.end();

    if (user_exists_res.rows.length > 0) {
      // the user exists, so compare the passwords if they match it's a valid user, assign the user a token
      const user = user_exists_res.rows[0];

      const matching_passwords = await bcrypt.compare(password, user.password);

      if (matching_passwords) {
        const token = jwt.sign(
          { user_id: user.user_id, email: user.email, fullname: user.fullname },
          process.env.T_SECRET_KEY,
          {
            expiresIn: "12h",
          }
        );

        user.token = token;

        return user;
      } else {
        // user exists but the passwords don't match
        throw new GraphQLError("Wrong password");
      }
    } else {
      // user with the given email doesn't exist
      throw new GraphQLError("User not found. Register your account first");
    }
  } catch (error) {
    // unfortunately the server couldn't process the request as expected
    console.log(error);

    return new GraphQLError(error?.message);
  }
};

// UPDATE USER'S PROFILE MUTATION
export const update_user_profile = async (_, args, contextValue) => {
  // check if there's a decoded user, otherwise throw errors aborting the update profile operation
  const decoded_user = await private_resolvers_guard(contextValue);

  const decoded_user_id = decoded_user.user_id;

  let { email, fullname, password } = args;

  const confirm_uid_query = "SELECT * FROM job_seeker WHERE user_id = $1";
  const update_profile_query =
    "UPDATE job_seeker SET fullname = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING user_id, fullname, email";

  try {
    await client.connect();

    // confirm the validity of the decoded user's id, return that user
    const confirm_uid_res = await client.query(confirm_uid_query, [
      decoded_user_id,
    ]);

    if (confirm_uid_res.rows.length > 0) {
      const current_user = confirm_uid_res.rows[0];

      if (current_user)
        if (password) {
          // encrypt password, assign token and update profile
          password = await bcrypt.hash(password, 10);
        }

      const update_profile_res = await client.query(update_profile_query, [
        fullname,
        email,
        password ? password : current_user.password,
        decoded_user_id,
      ]);
      // await client.end();

      if (update_profile_res.rows.length > 0) {
        // user updated successfully, now assign them a new token
        let updated_user = update_profile_res.rows[0];

        const new_token = jwt.sign(
          {
            user_id: updated_user.user_id,
            email: updated_user.email,
            fullname: updated_user.fullname,
          },
          process.env.T_SECRET_KEY,
          {
            expiresIn: "12h",
          }
        );

        updated_user.token = new_token;

        return updated_user;
      }
    } else {
      // no user with that id
      throw new GraphQLError("No user with that user ID");
    }
  } catch (error) {
    // the server couldn't update the profile as expected
    console.log(error);

    return new GraphQLError(error?.message);
  }
};

// SUBSCRIBE TO JOB UPDATES WITH EMAIL
export const handle_subscribe_with_email = async (_, { email }) => {
  if (!email) throw GraphQLError("To subscribe an email is needed");
  const email_subscribed_query = "SELECT email FROM subscribe WHERE email = $1";
  const subscribe_user_query =
    "INSERT INTO subscribe (email) VALUES ($1) RETURNING email";

  try {
    await client.connect();

    // check if there's that email already
    const email_subscribed_res = await client.query(email_subscribed_query, [
      email,
    ]);

    if (email_subscribed_res.rows.length > 0) {
      // that email is already subscribed
      throw new GraphQLError("Seems like you have already subcribed");
    } else {
      // email is unsubscribed, add it
      const subscribe_user_res = await client.query(subscribe_user_query, [
        email,
      ]);

      // await client.end();

      if (subscribe_user_res.rows.length > 0) {
        // email has been added successfully
        const subscribed_email = subscribe_user_res.rows[0];

        return subscribed_email;
      } else {
        throw new GraphQLError("Subscription is unsuccessful");
      }
    }
  } catch (error) {
    console.log(error);

    return new GraphQLError(error?.message);
  }
};
