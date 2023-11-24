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
  const { jobs, immutableJobs } = useContext(JobsUserContext);

  // update the jobs state on page mount
  const { loading, error } = useFetchJobs("fullstack development");

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
