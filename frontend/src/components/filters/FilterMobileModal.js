import {
  IoClose,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

const FilterMobileModal = ({
  filters,
  closeModal,
  handleSetActiveFilterValue,
  activeFilterValue,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="filter_mobile_modal_wrapper relative">
        <span
          onClick={(e) => closeModal()}
          className="absolute top-[1rem] right-[1rem]"
        >
          <IoClose />
        </span>
        <div className="flex_col gap-[1.5rem]">
          <h3 className="title_normal">Filter by:</h3>
          <div className="flex_col gap-[0.75rem]">
            {filters?.map((filter, index) => {
              return (
                <div key={index} className="group">
                  <div
                    onClick={(e) => handleSetActiveFilterValue(filter.value)}
                    className={`flex_between w-full ${
                      activeFilterValue === filter.value ? "text-ctaColor" : ""
                    }`}
                  >
                    <span className="capitalize text-smaller">
                      {filter.shownName}
                    </span>
                    <span>
                      {activeFilterValue === filter.value ? (
                        <IoCheckmarkCircleSharp />
                      ) : (
                        <IoCheckmarkCircleOutline />
                      )}
                    </span>
                  </div>
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
