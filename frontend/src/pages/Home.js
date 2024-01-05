import { motion } from "framer-motion";

import { pageVariants } from "../transitions/transitions";
import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/filters/Filters";
import Feed from "../components/jobsFeed/Feed";
import useFetchJobs from "../hooks/useFetchJobs";
import CTASection from "../components/CTASection";

const Home = () => {
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
