import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation register_user(
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    register_user(fullname: $fullname, email: $email, password: $password) {
      user_id
      fullname
      email
    }
  }
`;

export const SIGNIN_USER_MUTATION = gql`
  mutation signin_user($email: String!, $password: String!) {
    signin_user(email: $email, password: $password) {
      user_id
      fullname
      email
      password
      token
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation update_user_profile(
    $fullname: String
    $email: String
    $password: String
  ) {
    update_profile(fullname: $fullname, email: $email, password: $password) {
      user_id
      fullname
      email
      token
    }
  }
`;

export const SAVE_JOB_MUTATION = gql`
  mutation save_job(
    $job_title: String!
    $employment_type: String!
    $alien_job_id: String!
    $employer_name: String!
    $employer_logo: String
    $employer_website: String
    $company_type: String
    $apply_link: String!
    $job_description: String!
    $job_qualifications: [String!]
    $job_responsibilities: [String!]
    $date_posted: String!
    $date_expiring: String
    $job_city: String!
    $job_country: String!
    $user_id: ID!
  ) {
    save_job(
      saveJobInput: {
        job_title: $job_title
        employment_type: $employment_type
        alien_job_id: $alien_job_id
        employer_name: $employer_name
        employer_logo: $employer_logo
        employer_website: $employer_website
        company_type: $company_type
        apply_link: $apply_link
        job_description: $job_description
        job_qualifications: $job_qualifications
        job_responsibilities: $job_responsibilities
        date_posted: $date_posted
        date_expiring: $date_expiring
        job_city: $job_city
        job_country: $job_country
        user_id: $user_id
      }
    ) {
      job_id
      alien_job_id
      job_title
      employment_type
      employer_name
      employer_logo
      employer_website
      company_type
      job_description
      job_qualifications
      job_responsibilities
      date_posted
      date_expiring
      job_city
      job_country
      apply_link
      alien_job_id
    }
  }
`;

export const SUBSCRIBE_EMAIL = gql`
  mutation subscribe_email($email: String!) {
    subscribe_with_email(email: $email) {
      email
    }
  }
`;

export const DELETE_JOB = gql`
  mutation delete_a_job($job_id: ID!) {
    delete_job(job_id: $job_id) {
      job_id
      job_title
      alien_job_id
    }
  }
`;
