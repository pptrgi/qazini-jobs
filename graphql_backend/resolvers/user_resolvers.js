import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { pool } from "../utils/dbConnect.js";
import { verifyAuthToken } from "../middleware/verifyAuthToken.js";
import { private_resolvers_guard } from "../middleware/private_resolvers_guard.js";

// GET SINGLE USER QUERY
export const get_user_resolver = async (_, { user_id }, contextValue) => {
  // call the private resolvers guard with the context value
  // if there's no decoded user details, then it'll throw errors accordingly and terminate get user operation
  const decoded_user = await private_resolvers_guard(contextValue);

  // extract the user's id from the decoded user
  const decoded_user_id = decoded_user.user_id;
  const get_user_query = "SELECT * FROM job_seeker WHERE user_id = $1";
  const user_jobs_query = "SELECT * FROM job WHERE user_id = $1";

  // If the request doesn't contain user id throw an error
  if (!decoded_user_id) {
    throw new GraphQLError("User's ID is required to fetch a single user", {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }

  try {
    // connect to the database
    const client = await pool.connect();

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

      // release the db connection
      client.release();

      return user;
    } else {
      // the user with the provided id isn't found in the database
      throw new GraphQLError("User not found");
    }
  } catch (error) {
    // server couldn't process the request as expected
    console.log(error);

    throw new GraphQLError("Couldn't process your request", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
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

  console.log(fullname, email, password);

  try {
    // establish db connection
    const client = await pool.connect();

    // check if there's an existing user with the provided email
    const user_with_email_res = await client.query(email_exists_query, [email]);
    console.log(user_with_email_res);

    if (user_with_email_res.rows.length < 1) {
      // no similar user, so encrypt the new user's password and save them
      password = await bcrypt.hash(password, 10);

      const new_user_res = await client.query(register_user_query, [
        fullname,
        email,
        password,
      ]);

      const registered_user = new_user_res.rows[0];
      console.log(registered_user);

      // disconnect database
      client.release();

      return registered_user;
    } else {
      // there's a user with similar email
      throw new GraphQLError("Seems like this user already exists");
    }
  } catch (error) {
    // server couldn't process the request as expected
    console.log(error);

    throw new GraphQLError("Server couldn't process the register request", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
        frontendMessage: "Server encountered a problem registering",
      },
    });
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
    const client = await pool.connect();

    // make sure the user with given email exists
    const user_exists_res = await client.query(check_user_email_query, [email]);
    // after the response we don't need the db anymore, disconnect
    client.release();

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
        console.log("assigned token", token);

        user.token = token;

        return user;
      } else {
        // user exists but the passwords don't match
        throw new GraphQLError("Wrong password");
      }
    } else {
      // user with the given email doesn't exist
      throw new GraphQLError("User not found", {
        extensions: { frontendMessage: "User doesn't exist, Register first" },
      });
    }
  } catch (error) {
    // unfortunately the server couldn't process the request as expected
    console.log(error);

    throw new GraphQLError("Couldn't process your request", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// UPDATE USER'S PROFILE MUTATION
export const update_user_profile = async (_, args, contextValue) => {
  // check if there's a decoded user, otherwise throw errors aborting the update profile operation
  const decoded_user = await private_resolvers_guard(contextValue);
  console.log("from update, user", decoded_user);

  const decoded_user_id = decoded_user.user_id;

  let { email, fullname, password } = args;

  const confirm_uid_query = "SELECT * FROM job_seeker WHERE user_id = $1";
  const update_profile_query =
    "INSERT INTO job_seeker (fullname, email, password) VALUES ($1, $2, $3) ON CONFLICT (user_id, email) DO UPDATE SET fullname = EXCLUDED.fullname, email = EXCLUDED.email, password = EXCLUDED.password RETURNING user_id, fullname, email";
  const similar_email_query = "SELECT * FROM job_seeker WHERE email = $1";

  // REMEMBER: When updating a user 2 scenarios might happen: The new email is same as the old one(conflict handled by postgres), the new email is totally different and might have another user with it

  try {
    const client = await pool.connect();

    // confirm the validity of the decoded user's id, return that user
    const confirm_uid_res = await client.query(confirm_uid_query, [
      decoded_user_id,
    ]);

    if (confirm_uid_res.rows.length > 0) {
      const current_user = confirm_uid_res.rows[0];
      console.log("current user", current_user);

      // user didn't change the existing email
      const same_email = email === current_user.email;

      if (same_email) {
        // encrypt password, assign token and update profile
        password = await bcrypt.hash(password, 10);

        const update_profile_res = await client.query(update_profile_query, [
          fullname,
          email,
          password,
        ]);
        client.release();

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
        // the user is updating with a new email, check if it's already been used
        const similar_email_res = await client.query(similar_email_query, [
          email,
        ]);

        if (similar_email_res.rows.length > 0) {
          // there's another user with the email you were trying to update your profile with
          throw new GraphQLError("User with this email already exists");
        } else {
          // no other user with the provided email, update profile
          password = await bcrypt.hash(password, 10);

          const update_profile_res = await client.query(update_profile_query, [
            fullname,
            email,
            password,
          ]);
          client.release();

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
        }
      }
    } else {
      // no user with that id
      throw new GraphQLError("No user with that user ID");
    }
  } catch (error) {
    // the server couldn't update the profile as expected
    console.log(error);

    throw new GraphQLError("Couldn't process your request");
  }
};
