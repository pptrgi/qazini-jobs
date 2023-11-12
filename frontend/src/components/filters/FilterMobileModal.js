import { useContext } from "react";
import {
  IoClose,
  IoCheckmarkCircleSharp,
  IoRadioButtonOffSharp,
} from "react-icons/io5";

import { JobsUserContext } from "../../context/jobsUserContext";

const FilterMobileModal = ({
  filters,
  closeModal,
  setActiveFilterOptionValue,
  activeFilterOptionValue,
}) => {
  const context = useContext(JobsUserContext);

  // when the filter value is clicked... filter the jobs, make the clicked value active for styling and lastly close the modal
  const handleOptionValueClick = (filterValue) => {
    setActiveFilterOptionValue(filterValue && filterValue);

    context.searchJobs(filterValue && filterValue);

    closeModal();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="filter_mobile_modal_wrapper relative">
        <span
          onClick={(e) => closeModal()}
          className="absolute top-[1rem] right-[1rem] text-normal"
        >
          <IoClose />
        </span>
        <div className="flex_col gap-[1.5rem]">
          <h3 className="title_normal">Filter by:</h3>
          <div className="flex_col gap-[0.75rem]">
            {filters?.map((filterValue, index) => {
              return (
                <div key={index} className="group">
                  {/* some property values are null, don't show blank values */}
                  {filterValue && (
                    <div
                      onClick={(e) => handleOptionValueClick(filterValue)}
                      className={`flex_between w-full ${
                        activeFilterOptionValue === filterValue
                          ? "text-ctaColor"
                          : ""
                      }`}
                    >
                      <span className="capitalize text-smaller">
                        {filterValue}
                      </span>
                      <span className="text-normal">
                        {activeFilterOptionValue === filterValue ? (
                          <IoCheckmarkCircleSharp />
                        ) : (
                          <IoRadioButtonOffSharp />
                        )}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMobileModal;
