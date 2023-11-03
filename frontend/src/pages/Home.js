import { useContext, useEffect } from "react";

import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/filters/Filters";
import Feed from "../components/jobsFeed/Feed";

import { JobsUserContext } from "../context/jobsUserContext";
import { jobs } from "../app/_db";

const Home = () => {
  const context = useContext(JobsUserContext);

  // update the jobs state on page mount
  const fetchJobs = async () => {
    // const response = await fetch("https://jsearch.p.rapidapi.com/search", {
    //   method: "GET",
    //   params: {
    //     query: "web development, USA",
    //     page: "1",
    //     num_pages: "1",
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": "",
    //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    //   },
    // });
    // const foundJobs = await response.json();
    // console.log(foundJobs);
    // return foundJobs;
    const foundJobs = jobs;

    // this array holds all the fetched jobs except each job object now has the properties(and property names) that we'll need and use in the application
    // context jobs state will receive these jobs
    let readyToGoJobs = [];

    foundJobs.map((job) => {
      readyToGoJobs.push({
        employer_name: job.employer_name,
        employer_logo: job.employer_logo,
        employer_website: job.employer_website,
        company_type: job.employer_company_type,
        alien_job_id: job.job_id,
        employment_type: job.job_employment_type,
        job_title: job.job_title,
        apply_link: job.job_apply_link,
        job_description: job.job_description,
        job_qualifications: job.job_highlights.Qualifications,
        job_responsibilities: job.job_highlights.Responsibilities,
        date_posted: job.job_posted_at_datetime_utc,
        date_expiring: job.job_offer_expiration_datetime_utc,
        job_city: job.job_city,
        job_country: job.job_country,
      });
    });

    return context.populateJobs(readyToGoJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <Header />
      <Search />
      <Filters />
      <Feed />
    </div>
  );
};

export default Home;
