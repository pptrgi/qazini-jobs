export const typeDefs = `#graphql
type User {
    user_id: ID!
    fullname: String!
    email: String!
    password: String!
    token: String
    jobs: [Job]
}

type Job {
    job_id: ID!
    alien_job_id: String!
    job_title: String!
    employment_type: String!
    employer_name: String!
    employer_logo: String
    employer_website: String
    company_type: String
    apply_link: String!
    job_description: String!
    job_qualifications: [String!]
    job_responsibilities: [String!]
    date_posted: String!
    date_expiring: String
    job_city: String!
    job_country: String!
}

type SubscribeWithEmail {
    email: String!
}

type Query {
    get_user(user_id: ID!): User
}

type Mutation {
    register_user(fullname: String!, email: String!, password: String!): User
    signin_user(email: String!, password: String!): User
    update_profile(fullname: String, email: String, password: String): User
    save_job(saveJobInput: SaveJobInput!): Job
    delete_job(job_id: ID!): Job
    subscribe_with_email(email: String!): SubscribeWithEmail
}

input SaveJobInput {
    job_title: String!
    employment_type: String!
    alien_job_id: String!
    employer_name: String!
    employer_logo: String
    employer_website: String
    company_type: String
    apply_link: String!
    job_description: String!
    job_qualifications: [String!]
    job_responsibilities: [String!]
    date_posted: String!
    date_expiring: String
    job_city: String!
    job_country: String!
    user_id: ID!
}

`;
