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
    job_type VARCHAR(100) NOT NULL,
    alien_job_id VARCHAR(200) NOT NULL,
    employer_name VARCHAR(100) NOT NULL,
    employer_logo VARCHAR(255),
    employer_website VARCHAR(255),
    job_description TEXT NOT NULL,
    job_qualifications TEXT NOT NULL,
    job_requirements TEXT,
    date_posted DATE NOT NULL,
    date_expiring DATE NOT NULL,
    job_city VARCHAR(100) NOT NULL,
    job_country VARCHAR(100) NOT NULL,
    apply_link VARCHAR(250) NOT NULL,
    user_id UUID REFERENCES job_seeker(user_id) NOT NULL,
    UNIQUE(job_id)
);

-- INSERT INTO job_seeker (user_id, fullname, email, password) VALUES (UUID_generate_v4(), 'Janerosa Njeri', 'janerosa@gmail.com', 'sldfLLSDFLllsdf4l45ll435lsfdlalLKSDFL');
-- INSERT INTO job_seeker (user_id, fullname, email, password) VALUES (UUID_generate_v4(), 'Romeo Makoha', 'romeo@yahoo.com', 'LSDlsdalfl45kldfn345lksflkLFDGKL564Lkd');
-- INSERT INTO job_seeker (user_id, fullname, email, password) VALUES (UUID_generate_v4(), 'Alexis Swaf', 'alexis@hotmail.com', 'LSDlsdalfl45kldsdffn345lksflksdKL564Lkd');
INSERT INTO job_seeker (fullname, email, password) VALUES ('Janerosa Njeri', 'janerosa@gmail.com', 'sldfLLSDFLllsdf4l45ll435lsfdlalLKSDFL');
INSERT INTO job_seeker(fullname, email, password) VALUES ('Romeo Makoha', 'romeo@yahoo.com', 'LSDlsdalfl45kldfn345lksflkLFDGKL564Lkd');
INSERT INTO job_seeker(fullname, email, password) VALUES ('Alexis Swaf', 'alexis@hotmail.com', 'LSDlsdalfl45kldsdffn345lksflksdKL564Lkd');

-- INSERT INTO job (job_id, job_title, job_title, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_requirements, date_posted, date_expiring, job_city, job_country, user_id) VALUES (UUID_generate_v4(), 'Electrical Engineer - Rukuriri Tea Factory', 'Full-time', ' Rukuriri Tea Factory', 'https://www.rukuririteas.co.ke/logo', 'https://www.rukuririteas.co.ke', 'the electrical engineer job description will be long', 'electrical engineer job qualifications', 'here the requirements for the electrical engineer job', DATE '2023-09-12', DATE '2023-10-21', 'Runyenjes', 'Uganda', )
INSERT INTO job (job_title, job_type, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_requirements, date_posted, date_expiring, job_city, job_country, user_id) VALUES ('Electrical Engineer - Rukuriri Tea Factory', 'Full-time', ' Rukuriri Tea Factory', 'https://www.rukuririteas.co.ke/logo', 'https://www.rukuririteas.co.ke', 'the electrical engineer job description will be long', 'electrical engineer job qualifications', 'here the requirements for the electrical engineer job', DATE '2023-09-12', DATE '2023-10-21', 'Runyenjes', 'Uganda', '1');
INSERT INTO job (job_title, job_type, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_requirements, date_posted, date_expiring, job_city, job_country, user_id) VALUES ('Electrical Engineer - Rukuriri Tea Factory', 'Full-time', ' Rukuriri Tea Factory', 'https://www.rukuririteas.co.ke/logo', 'https://www.rukuririteas.co.ke', 'the electrical engineer job description will be long', 'electrical engineer job qualifications', 'here the requirements for the electrical engineer job', DATE '2023-09-12', DATE '2023-10-21', 'Runyenjes', 'Uganda', '3');
INSERT INTO job (job_title, job_type, employer_name, employer_logo, employer_website, job_description, job_qualifications, job_requirements, date_posted, date_expiring, job_city, job_country, user_id) VALUES ('Frontend Developer', 'Contractor', 'Lifener Technologies', 'https://www.lifener.com/logo', 'https://www.lifener.co.ke', 'the frotend developer job description', 'frontend developer job qualifications here', 'here the requirements for the frontend developer job post', DATE '2023-10-23', DATE '2023-11-05', 'Thike', 'Tanzania', '3');

