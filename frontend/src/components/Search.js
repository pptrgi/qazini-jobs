import { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";

import { JobsUserContext } from "../context/jobsUserContext";
import { jobsFetcher } from "../utils/fetchJobs";
import { fadeOutVariants } from "../transitions/transitions";
import LoadingDots from "./LoadingDots";

const Search = ({ loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const context = useContext(JobsUserContext);

  // condition search
  const handleSearchJobs = async (e) => {
    e.preventDefault();

    const getStoredCount = () => {
      return { storedSearchCount: localStorage.getItem("searchCount") };
    };
    const { storedSearchCount } = getStoredCount();

    if (storedSearchCount) {
      localStorage.setItem("searchCount", parseInt(storedSearchCount) + 1);
    } else {
      localStorage.setItem("searchCount", 0);
    }

    setSearching(true);
    const searchedJobs = await jobsFetcher(
      searchText,
      parseInt(storedSearchCount)
    ); // jobFetcher() function might return an array of jobs or an error

    if (typeof searchedJobs !== "string") {
      setSearching(false);
      return context.setJobs(searchedJobs);
    } else {
      setSearchError(searchedJobs);
      setSearching(false);
    }
  };

  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container search_section"
    >
      <div className="flex_center w-full">
        <form
          onSubmit={handleSearchJobs}
          className="flex_between border_1_full items-center search_form_width"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search_input_field"
            placeholder="Search e.g. teacher, kenya"
            required
          />

          {/* if home page is loading jobs or searching is underway, disable button */}
          <button
            type="submit"
            className={`cta_button mr-[0.3rem] min-w-fit ${
              searching == true || loading == true
                ? "bg-opacity-40 cursor-none"
                : null
            }`}
            disabled={
              searching === true || loading === true || searchText === ""
                ? true
                : false
            }
          >
            {searching ? (
              <LoadingDots />
            ) : (
              <>
                <span className="block text-h3 text-bodyColor/95 md480:hidden">
                  <IoSearch />
                </span>
                <span className="hidden md480:block">Search job</span>
              </>
            )}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Search;
