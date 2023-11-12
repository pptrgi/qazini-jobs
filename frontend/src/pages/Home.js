import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/filters/Filters";
import Feed from "../components/jobsFeed/Feed";

import { JobsUserContext } from "../context/jobsUserContext";
import { jobs } from "../app/_db";
import CTASection from "../components/CTASection";
import useFetchJobs from "../hooks/useFetchJobs";
import { pageVariants } from "../transitions/transitions";

const Home = () => {
  const context = useContext(JobsUserContext);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // update the jobs state on page mount
  const { loading, error } = useFetchJobs("fullstack development");

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
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      <Header />
      <Search loading={loading} />
      <Filters />
      <Feed loading={loading} error={error} />
      <CTASection />
    </motion.div>
  );
};

export default Home;
