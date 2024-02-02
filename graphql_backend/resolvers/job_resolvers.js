import { GraphQLError } from "graphql";

import { pool } from "../utils/dbConnect.js";
import { private_resolvers_guard } from "../middleware/private_resolvers_guard.js";

// SAVE A JOB MUTATION HANDLER
export const handle_save_job = async (_, { saveJobInput }, contextValue) => {
  // destructure the input arg to get job properties
  let {
    job_title,
    employment_type,
    alien_job_id,
    employer_name,
    employer_logo,
    employer_website,
    company_type,
    job_description,
    job_qualifications,
    job_responsibilities,
    date_posted,
    date_expiring,
    job_city,
    job_country,
    apply_link,
  } = saveJobInput;

  // make sure user is authenticated
  const decoded_user = await private_resolvers_guard(contextValue);

  // make sure necessary fields are passed
  if (
    !job_title ||
    !employment_type ||
    !alien_job_id ||
    !employer_name ||
    !job_description ||
    !date_posted ||
    !job_city ||
    !job_country ||
    !apply_link
  ) {
    throw new GraphQLError("Make sure all the required fields are provided");
  }

  // modify the date fields
  date_posted = new Date(date_posted);
  date_expiring = new Date(date_expiring);

  const decoded_user_id = decoded_user.user_id;
  const id_owner_query = "SELECT user_id FROM job_seeker WHERE user_id = $1";
  const save_job_query =
    "INSERT INTO job (job_title, employment_type, employer_name, employer_logo, company_type, employer_website, job_description, job_qualifications, job_responsibilities, date_posted, date_expiring, job_city, job_country, user_id, apply_link, alien_job_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING job_id, job_title, employment_type, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_responsibilities, date_posted, date_expiring, job_city, job_country, apply_link, alien_job_id";
  const unsave_job_query =
    "DELETE FROM job WHERE job_id = $1 RETURNING job_id, job_title, employment_type, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_responsibilities, date_posted, date_expiring, job_city, job_country, apply_link, alien_job_id";
  const find_job_query =
    "SELECT alien_job_id, job_id FROM job WHERE user_id = $1";
  const job_fields_array = [
    job_title,
    employment_type,
    employer_name,
    employer_logo,
    company_type,
    employer_website,
    job_description,
    job_qualifications,
    job_responsibilities,
    date_posted,
    date_expiring,
    job_city,
    job_country,
    decoded_user_id,
    apply_link,
    alien_job_id,
  ];

  let client;

  try {
    // connect to the database
    client = await pool.connect();

    // start transaction
    await client.query("BEGIN");

    // check if there's a user associated with provided details
    const user_exists_res = await client.query(id_owner_query, [
      decoded_user_id,
    ]);

    if (user_exists_res.rows.length > 0) {
      // the user exists
      const found_user = user_exists_res.rows[0];

      // find the jobs related to this user
      const user_jobs_res = await client.query(find_job_query, [
        found_user?.user_id,
      ]);

      // if the user has saved no jobs yet or hasn't saved this job before, save it, otherwise unsave it
      if (user_jobs_res.rows.length >= 0) {
        const user_jobs = user_jobs_res.rows;

        const already_existing_job = user_jobs?.find(
          (job) => job?.alien_job_id == `${alien_job_id}`
        );

        if (!already_existing_job) {
          const save_job_res = await client.query(
            save_job_query,
            job_fields_array
          );

          const new_job = save_job_res.rows[0];

          await client.query("COMMIT"); // commit the transaction

          return new_job;
        } else {
          const unsave_job_res = await client.query(unsave_job_query, [
            already_existing_job?.job_id,
          ]);

          const unsaved_job = unsave_job_res.rows[0];

          await client.query("COMMIT"); // commit the transaction

          return unsaved_job;
        }
      }
    } else {
      // user doesn't exist
      throw new GraphQLError("Sign in to save jobs");
    }
  } catch (error) {
    // unfortunately the server couldn't save the job
    console.log(error);

    // rollback transaction on error
    if (client) await client.query("ROLLBACK");

    return new GraphQLError(error?.message);
  } finally {
    // if this client is still active release it back to the pool
    if (client) client.release();
  }
};

// DELETE A JOB MUTATION HANDLER

export const delete_job_handler = async (_, { job_id }, contextValue) => {
  // const decoded_user = verifyAuthToken(context);
  // check first if the user is signed in and the validity of the details
  const decoded_user = await private_resolvers_guard(contextValue);
  const decoded_user_id = decoded_user?.user_id;

  const delete_job_query =
    "DELETE FROM job WHERE job_id = $1 RETURNING job_id, job_title, alien_job_id";
  const find_user_query = "SELECT * FROM job_seeker WHERE user_id = $1";
  const find_job_query = "SELECT * FROM job WHERE job_id = $1";

  if (!job_id) {
    throw new GraphQLError("Provide the job ID");
  }

  let client;

  try {
    // database connection
    client = await pool.connect();

    // start transaction
    await client.query("BEGIN");

    // find user
    const found_user_res = await client.query(find_user_query, [
      decoded_user_id,
    ]);

    if (found_user_res.rows.length > 0) {
      // find if the job exists
      const found_job_res = await client.query(find_job_query, [job_id]);

      if (found_job_res.rows.length > 0) {
        // the job exists, delete
        const delete_job_res = await client.query(delete_job_query, [job_id]);

        const deleted_job = delete_job_res.rows[0];

        await client.query("COMMIT"); // commit the transaction

        return deleted_job;
      } else {
        // such job doesn't exist
        throw new GraphQLError("This job is already deleted");
      }
    } else {
      // user wasn't found
      throw new GraphQLError("Deleting is not allowed!");
    }
  } catch (error) {
    // unfortunately the server couldn't delete the job
    console.log(error);

    // rollback the transaction on error
    if (client) await client.query("ROLLBACK");

    return new GraphQLError(error?.message);
  } finally {
    // if this client is still active release it back to the pool
    if (client) client.release();
  }
};
