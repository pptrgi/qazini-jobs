CREATE DATABASE qazini_db;

CREATE TABLE job_seeker (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(250) NOT NULL, 
    UNIQUE(user_id),
    UNIQUE(email)
);

CREATE TABLE job (
    job_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employment_type VARCHAR(100) NOT NULL,
    alien_job_id VARCHAR(200) NOT NULL,
    employer_name VARCHAR(100) NOT NULL,
    employer_logo VARCHAR(255),
    employer_website VARCHAR(255),
    company_type VARCHAR(255),
    job_description TEXT NOT NULL,
    job_qualifications TEXT[],
    job_responsibilities TEXT[],
    date_posted DATE NOT NULL,
    date_expiring DATE,
    job_city VARCHAR(100) NOT NULL,
    job_country VARCHAR(100) NOT NULL,
    apply_link VARCHAR(250) NOT NULL,
    user_id UUID REFERENCES job_seeker(user_id) NOT NULL,
    UNIQUE(job_id)
);

CREATE TABLE subscribe (
    email VARCHAR(100) NOT NULL,
    UNIQUE(email)
);
