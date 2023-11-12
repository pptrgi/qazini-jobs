import { GraphQLError } from "graphql";

import { pool } from "../utils/dbConnect.js";
import { private_resolvers_guard } from "../middleware/private_resolvers_guard.js";

// SAVE A JOB MUTATION
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
    !job_qualifications ||
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
  const remove_job_query = "DELETE FROM TABLE job WHERE job_id = $1";
  const job_fields_array = [
    job_title,
    employment_type,
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
    decoded_user_id,
    apply_link,
    alien_job_id,
  ];

  try {
    // connect to the database
    const client = await pool.connect();

    // check if there's a user associated with provided details
    const user_exists_res = await client.query(id_owner_query, [
      decoded_user_id,
    ]);

    if (user_exists_res.rows.length > 0) {
      // the user is there, check if the job exists in the found user's jobs array
      const found_user = user_exists_res.rows[0];

      const job_already_exists = found_user?.jobs?.find(
        (job) => job?.job_title == job_title
      );
      console.log(job_already_exists);

      // if the job is already saved, remove otherwise save it
      if (!job_already_exists) {
        const save_job_res = await client.query(
          save_job_query,
          job_fields_array
        );

        const new_job = save_job_res.rows[0];
        client.end();

        return new_job;
      } else {
        const remove_job_res = await client.query(remove_job_query, [
          job_already_exists?.job_id,
        ]);

        const removed_job = remove_job_res.rows[0];
        client.end();

        return removed_job;
      }
    } else {
      // user doesn't exist
      throw new GraphQLError("Sign in to save jobs");
    }
  } catch (error) {
    // unfortunately the server couldn't save the job
    console.log(error);

    throw new GraphQLError(error?.message);
  }
};

// MUTATION TO DELETE A JOB
export const delete_job_handler = async (_, { job_id }, contextValue) => {
  // const decoded_user = verifyAuthToken(context);
  // check first if the user is signed in and the validity of the details
  const decoded_user_id = contextValue?.user_id;
  const delete_job_query =
    "DELETE FROM TABLE job WHERE job_id = $1 RETURNING job_id, job_title";
  const find_user_query = "SELECT * FROM job_seeker WHERE user_id = $1";

  try {
    // database connection
    const client = await pool.connect();

    // find user
    const found_user_res = await client.query(find_user_query, [
      decoded_user_id,
    ]);

    if (found_user_res.rows.length > 0) {
      // user found, find the job from the user's jobs
      const user = found_user_res.rows[0];

      const existing_job = user?.jobs?.find((job) => job?.job_id == job_id);

      // if that job exists, delete otherwise show it's already deleted
      if (existing_job) {
        const delete_job_res = await client.query(delete_job_query, [job_id]);

        const deleted_job = delete_job_res.rows[0];
        client.end();

        return deleted_job;
      } else {
        // such job doesn't exist
        // return statement??
        throw new GraphQLError("Job is already deleted");
      }
    } else {
      // user wasn't found
      throw new GraphQLError("Deleting is not allowed!");
    }
  } catch (error) {
    // unfortunately the server couldn't delete the job
    console.log(error);

    throw new GraphQLError(`${error?.message}`);
  }
};
