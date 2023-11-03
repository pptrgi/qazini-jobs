import { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";

import { JobsUserContext } from "../context/jobsUserContext";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const context = useContext(JobsUserContext);

  const handleSearchJobs = (e) => {
    e.preventDefault();
    context.searchJobs(searchText);
  };

  return (
    <section className="custom_container search_section">
      <div className="flex_center w-full">
        <form
          onSubmit={handleSearchJobs}
          className="flex_between border_1_full items-center filter_form_width"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search_input_field"
            placeholder="Search by job title, industry, type"
          />
          <span className="block cta_button mr-[0.3rem] md480:hidden">
            <IoSearch />
          </span>
          <button
            type="submit"
            className="hidden cta_button mr-[0.3rem] min-w-fit md480:block"
          >
            Search job
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
