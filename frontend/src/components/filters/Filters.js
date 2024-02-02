import { useContext, useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp, IoOptionsOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import FilterDropdown from "./FilterDropdown";
import FilterMobileModal from "./FilterMobileModal";
import { JobsUserContext } from "../../context/jobsUserContext";
import { filterOptions } from "./filterOptions";
import { fadeOutVariants } from "../../transitions/transitions";

const Filters = () => {
  // menus displaying filter values
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // active filter property and value to be used to filter overall jobs array and styling
  const [activeFilterOption, setActiveFilterOption] = useState("");
  const [activeFilterOptionValue, setActiveFilterOptionValue] = useState("");

  const [filterOptionsArray, setFilterOptionsArray] = useState([]); // array of the gathered filter values
  const { jobs, immutableJobs, setJobs } = useContext(JobsUserContext); // jobs from context
  const filterOptionsValues = new Set(); // a set to remove duplicate filter values

  // confirm the jobs arrays are not empty
  const notEmptyJobs = jobs?.length > 0 || immutableJobs?.length > 0;

  const handleOptionClick = (optionProperty, optionName) => {
    /**
     * On filter option button click:
     *  1. clear the existing entries in set
     *  2. update set with values of the current jobs array based on the job property clicked
     *  3. open the menu/modal
     *  4. lastly append to the filter values array values belonging to the selected property
     */

    if (notEmptyJobs) {
      filterOptionsValues.clear();

      jobs?.map((job) => filterOptionsValues.add(job[optionProperty]));

      setShowDropdown(!showDropdown);
      setShowMobileModal(true);
      setActiveFilterOption(`${optionName}`);

      setFilterOptionsArray([]);
      filterOptionsValues?.forEach((option) =>
        setFilterOptionsArray((prevArray) => [...prevArray, option])
      );
    } else {
      toast.error("No jobs to filter, refresh page");
    }
  };

  // reset the active filter values and arrays on clear-filters button click
  const handleClearFilters = () => {
    setJobs(immutableJobs);
    setActiveFilterOption("");
    setActiveFilterOptionValue("");
    setFilterOptionsArray([]);
  };
  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container section_after_search"
    >
      <div>
        <div className="flex justify-center gap-[1rem] items-center relative">
          <span className="px-[1rem] py-[0.6rem] bg-lightGrayColor text-textColor/70 rounded-xl text-h3">
            <IoOptionsOutline />
          </span>
          <div className="overflow-x-auto py-[0.5rem] px-[0.25rem] md480:px-[0.5rem]">
            <div className="flex gap-[0.75rem]">
              {filterOptions.map((option) => {
                return (
                  <div className="group cursor-pointer">
                    <div
                      onClick={(e) =>
                        handleOptionClick(
                          option.optionProperty,
                          option.optionName
                        )
                      }
                      className={`filter_button ${
                        activeFilterOption === option.optionName
                          ? "bg-darkColor/70 text-bodyColor/90"
                          : "bg-lightGrayColor"
                      }`}
                    >
                      <span className="filter_name">{option.optionName}</span>
                      <span>
                        {activeFilterOption === option.optionName ? (
                          <IoChevronUp />
                        ) : (
                          <IoChevronDown />
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filterOptionsArray?.length > 0 && (
                <div
                  onClick={(e) => {
                    handleClearFilters();
                  }}
                  className={
                    "filter_button bg-darkColor/70 text-bodyColor/90 cursor-pointer"
                  }
                >
                  <span className="filter_name">Clear filters</span>
                </div>
              )}
            </div>
          </div>
          {/* Only open the dropdown if the jobs array is not empty and showDropdown is true */}
          {showDropdown && (
            <div id="dropdownMenu">
              <FilterDropdown
                filters={filterOptionsArray}
                closeDropdown={() => setShowDropdown(false)}
                setActiveFilterOptionValue={(filterValue) =>
                  setActiveFilterOptionValue(filterValue)
                }
                activeFilterOptionValue={activeFilterOptionValue}
              />
            </div>
          )}
        </div>

        {/* Only open the modal if showMobileModal is true */}
        {showMobileModal && (
          <div id="mobilemodal">
            <FilterMobileModal
              filters={filterOptionsArray}
              closeModal={() => setShowMobileModal(false)}
              setActiveFilterOptionValue={(filterValue) =>
                setActiveFilterOptionValue(filterValue)
              }
              activeFilterOptionValue={activeFilterOptionValue}
            />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Filters;
