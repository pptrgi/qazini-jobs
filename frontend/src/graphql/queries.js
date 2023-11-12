import { gql } from "@apollo/client";

const GET_USER_QUERY = gql`
  query get_single_user($user_id: ID!) {
    get_user(user_id: $user_id) {
      user_id
      fullname
      email
      jobs {
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
      }
    }
  }
`;
const GET_USERS = gql`
  query get_users {
    users {
      user_id
      fullname
      email
    }
  }
`;

export { GET_USER_QUERY, GET_USERS };
