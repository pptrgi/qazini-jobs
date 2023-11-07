import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/filters/Filters";
import Feed from "../components/jobsFeed/Feed";

import { JobsUserContext } from "../context/jobsUserContext";
import { jobs } from "../app/_db";
import CTASection from "../components/CTASection";
import useFetchJobs from "../hooks/useFetchJobs";

const Home = () => {
  const context = useContext(JobsUserContext);
  const [error, setError] = useState("");
  const [fetchedJobsData, setFetchedJobsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch request options
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "de8798e5a5msh4ea80eadd2055e1p13fa19jsna581fd2c58b4",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      query: "fullstack development",
      pages: 1,
      num_pages: 1,
    },
  };

  // function that will make the request with the above options and update jobsData state with the returned data
  const fetchJobsData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      console.log(response?.data?.data);

      // setFetchedJobsData(response?.data?.data);

      let readyToGoJobs = [];

      response?.data?.data?.map((job) => {
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

      context.populateJobs(readyToGoJobs);

      setLoading(false);

      return context.populateJobs(readyToGoJobs);
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  // call the fetch function on page mount
  useEffect(() => {
    fetchJobsData();
  }, []);

  // const { jobsData, loading, error } = useFetchJobs;

  // context.populateJobs(jobsData);

  // update the jobs state on page mount
  // const fetchJobs = async () => {
  //   const foundJobs = jobs;

  //   // this array holds all the fetched jobs except each job object now has the properties(and property names) that we'll need and use in the application
  //   // context jobs state will receive these jobs
  //   let readyToGoJobs = [];

  //   foundJobs.map((job) => {
  //     readyToGoJobs.push({
  //       employer_name: job.employer_name,
  //       employer_logo: job.employer_logo,
  //       employer_website: job.employer_website,
  //       company_type: job.employer_company_type,
  //       alien_job_id: job.job_id,
  //       employment_type: job.job_employment_type,
  //       job_title: job.job_title,
  //       apply_link: job.job_apply_link,
  //       job_description: job.job_description,
  //       job_qualifications: job.job_highlights.Qualifications,
  //       job_responsibilities: job.job_highlights.Responsibilities,
  //       date_posted: job.job_posted_at_datetime_utc,
  //       date_expiring: job.job_offer_expiration_datetime_utc,
  //       job_city: job.job_city,
  //       job_country: job.job_country,
  //     });
  //   });

  //   return context.populateJobs(readyToGoJobs);
  // };

  // useEffect(() => {
  //   fetchJobs();
  // }, []);
  return (
    <div>
      <Header />
      <Search />
      <Filters />
      <Feed />
      <CTASection />
    </div>
  );
};

export default Home;
