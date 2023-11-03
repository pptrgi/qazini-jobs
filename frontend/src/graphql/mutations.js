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
    }
  }
`;

export const SAVE_JOB_MUTATION = gql`
  mutation save_job(
    $job_title: String!
    $job_type: String!
    $alien_job_id: String!
    $employer_name: String!
    $employer_logo: String
    $employer_website: String
    $apply_link: String!
    $job_description: String!
    $job_qualifications: String!
    $job_requirements: String
    $date_posted: String!
    $date_expiring: String!
    $job_city: String!
    $job_country: String!
    $user_id: ID!
  ) {
    save_job(
      saveJobInput: {
        job_title: $job_title
        job_type: $job_type
        alien_job_id: $alien_job_id
        employer_name: $employer_name
        employer_logo: $employer_logo
        employer_website: $employer_website
        apply_link: $apply_link
        job_description: $job_description
        job_qualifications: $job_qualifications
        job_requirements: $job_requirements
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
      job_type
      employer_name
      employer_logo
      employer_website
      job_description
      job_qualifications
      job_requirements
      date_posted
      date_expiring
      job_city
      job_country
      apply_link
      alien_job_id
    }
  }
`;
