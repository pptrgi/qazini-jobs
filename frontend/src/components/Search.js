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
  const [searchCount, setSearchCount] = useState(0);

  const handleSearchJobs = async (e) => {
    e.preventDefault();
    console.log("searchText", searchText);

    const storedSearchCount = localStorage.getItem("searchCount");
    if (storedSearchCount) {
      setSearchCount(parseInt(storedSearchCount, 10) + 1);
    }
    localStorage.setItem("searchCount", searchCount);

    setSearching(true);
    const searchedJobs = await jobsFetcher(searchText, searchCount); // jobFetcher() function might return an array of jobs or an error

    console.log("searchedJobs", searchedJobs);
    if (typeof searchedJobs !== "string") {
      setSearching(false);
      console.log(searchedJobs);
      return context.setJobs(searchedJobs);
    } else {
      setSearchError(searchedJobs);
      console.log(searchedJobs);
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
            placeholder="Search by the job title"
          />

          {/* if home page is loading jobs or searching is underway, disable button */}
          <button
            type="submit"
            className={`cta_button mr-[0.3rem] min-w-fit ${
              searching == true || loading == true
                ? "bg-opacity-40 cursor-none"
                : null
            }`}
            disabled={searching === true || loading === true ? true : false}
          >
            {searching ? (
              <LoadingDots />
            ) : (
              <>
                <span className="block md480:hidden">
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
