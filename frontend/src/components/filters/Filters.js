import { useContext, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import FilterDropdown from "./FilterDropdown";
import { filtersData } from "./FilterData";
import FilterMobileModal from "./FilterMobileModal";
import { JobsUserContext } from "../../context/jobsUserContext";

const Filters = () => {
  const context = useContext(JobsUserContext);

  // filter values for a property/key
  const [filterValuesArray, setFilterValuesArray] = useState([]);

  // menus displaying filter values
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // active filter property and value to be used to filter overall jobs array and styling
  const [activeFilterProperty, setActiveFilterProperty] = useState("");
  const [activeFilterValue, setActiveFilterValue] = useState("");

  const filtersKeys = Object.keys(filtersData);

  // updates the filter values array, sets active property/key and opens menus
  const handleFilterClick = (filterValuesArray, filteringProperty) => {
    setFilterValuesArray(filterValuesArray);
    setShowMobileModal(true);
    setShowDropdown(true);
    setActiveFilterProperty(filteringProperty);
  };

  // sets the active filter value
  const handleSetActiveFilterValue = (filterValueName) => {
    setActiveFilterValue(filterValueName);

    // use the context's filterJobs() method to filter the jobs based on the set criteria
    context.filterJobs(activeFilterProperty, filterValueName);
  };

  return (
    <section className="custom_container section_after_search">
      <div className="">
        <div className="flex gap-[1.75rem] items-center relative">
          <h3 className="title_normal">Filters:</h3>
          <div className="overflow-x-auto py-[0.5rem] px-[0.5rem]">
            <div className="flex gap-[1.5rem]">
              {filtersKeys.map((key) => {
                return (
                  <div className="group cursor-pointer">
                    <div
                      onClick={(e) =>
                        handleFilterClick(filtersData[key].data, key)
                      }
                      className={`filter_button ${
                        activeFilterProperty === key
                          ? "bg-ctaColor text-bodyColor"
                          : "bg-lightGrayColor"
                      }`}
                    >
                      <span className="filter_name">
                        {filtersData[key].name}
                      </span>
                      <span>
                        <IoChevronDown />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {showDropdown && (
            <div id="dropdownMenu">
              <FilterDropdown
                filters={filterValuesArray}
                handleSetActiveFilterValue={handleSetActiveFilterValue}
                activeFilterValue={activeFilterValue}
              />
            </div>
          )}
        </div>
        {showMobileModal && (
          <div id="mobilemodal">
            <FilterMobileModal
              filters={filterValuesArray}
              closeModal={() => setShowMobileModal(false)}
              handleSetActiveFilterValue={handleSetActiveFilterValue}
              activeFilterValue={activeFilterValue}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;
