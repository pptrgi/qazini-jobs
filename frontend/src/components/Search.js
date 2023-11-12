import { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";

import { JobsUserContext } from "../context/jobsUserContext";
import { jobsFetcher } from "../utils/fetchJobs";
import { fadeOutVariants } from "../transitions/transitions";

const Search = ({ loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const context = useContext(JobsUserContext);

  console.log("loading", loading);
  console.log("searching", searching);

  const handleSearchJobs = async (e) => {
    e.preventDefault();

    setSearching(true);
    const searchedJobs = jobsFetcher(searchText); // jobFetcher() function might return an array of jobs or an error

    console.log(searchedJobs);
    if (typeof searchedJobs == "array") {
      setSearching(false);
      console.log(searchedJobs);
      return context.populateJobs(searchedJobs);
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
          <span className="block cta_button mr-[0.3rem] md480:hidden">
            <IoSearch />
          </span>
          {/* if home page is loading jobs or searching is underway, disable button */}
          <button
            type="submit"
            className={`hidden cta_button mr-[0.3rem] min-w-fit ${
              searching == true || loading == true
                ? "bg-opacity-40 cursor-none"
                : null
            } md480:block`}
            disabled={searching === true || loading === true ? true : false}
          >
            Search job
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Search;
