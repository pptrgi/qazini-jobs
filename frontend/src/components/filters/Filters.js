import { useContext, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";

import FilterDropdown from "./FilterDropdown";
import FilterMobileModal from "./FilterMobileModal";
import { JobsUserContext } from "../../context/jobsUserContext";
import { filterOptions } from "./filterOptions";
import { toast } from "react-toastify";
import { fadeOutVariants } from "../../transitions/transitions";

const Filters = () => {
  const context = useContext(JobsUserContext);
  const jobs = context.jobs;
  const filterOptionsValues = new Set();
  const [filterOptionsArray, setFilterOptionsArray] = useState([]);
  // menus displaying filter values
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // active filter property and value to be used to filter overall jobs array and styling
  const [activeFilterOption, setActiveFilterOption] = useState("");
  const [activeFilterOptionValue, setActiveFilterOptionValue] = useState("");

  const notEmptyJobs =
    context.jobs?.length > 0 || context.immutableJobs?.length > 0;

  /*
 On filter option click:
  1. clear the existing entries in set
  2. update set with values of the current jobs array based on the job property clicked
  3. open the menu/modal
  4. lastly append to the filter values array values belonging to the selected property
 */
  const handleOptionClick = (optionProperty, optionName) => {
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

  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container section_after_search"
    >
      <div className="">
        <div className="flex gap-[1.5rem] items-center relative">
          <h3 className="title_normal">Filters:</h3>
          <div className="overflow-x-auto py-[0.5rem] px-[0.5rem]">
            <div className="flex gap-[1.5rem]">
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
                          ? "bg-ctaColor text-bodyColor"
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
            </div>
          </div>
          {/* Only open the dropdown if the jobs array is not empty and showDropdown is true */}
          {/* {showDropdown && context.jobs?.length > 0 && ( */}
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
