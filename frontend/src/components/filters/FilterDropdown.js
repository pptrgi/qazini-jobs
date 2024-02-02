import { useContext, useRef } from "react";

import { JobsUserContext } from "../../context/jobsUserContext";
import useClickOutsideClose from "../../hooks/useClickOutsideClose";

const FilterDropdown = ({
  filters,
  closeDropdown,
  setActiveFilterOptionValue,
  activeFilterOptionValue,
}) => {
  const context = useContext(JobsUserContext);
  const dropdownRef = useRef();

  // close the dropdown menu on outside click
  useClickOutsideClose(dropdownRef, closeDropdown);

  // when the filter value is clicked... filter the jobs, make the clicked value active for styling and lastly close the menu
  const handleOptionValueClick = (filterValue) => {
    setActiveFilterOptionValue(filterValue && filterValue);

    context.filterJobs(filterValue && filterValue);

    closeDropdown();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[3.25rem] left-[2rem] right-[2rem] z-20 lg1120:right-[4rem]"
    >
      <div className="flex_col w-full rounded-md shadow-lg bg-tintColor">
        {filters?.map((filterValue, index) => {
          return (
            <p
              key={index}
              onClick={(e) => handleOptionValueClick(filterValue)}
              className={`px-[1rem] py-[0.4rem] capitalize cursor-pointer hover:text-ctaColor trans_200 ${
                activeFilterOptionValue === filterValue ? "text-ctaColor" : ""
              }`}
            >
              {/* don't show null values */}
              {filterValue && filterValue}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FilterDropdown;
