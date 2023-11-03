const FilterDropdown = ({
  filters,
  handleSetActiveFilterValue,
  filterValue,
}) => {
  return (
    <div className="absolute top-[3rem] left-0 z-20 w-full">
      <div className="flex_col w-full rounded-md shadow-lg bg-bodyColor">
        {filters?.map((filter) => {
          return (
            <p
              onClick={(e) => handleSetActiveFilterValue(filter.value)}
              className={`px-[1rem] py-[0.4rem] capitalize ${
                filterValue === filter.value ? "text-ctaColor" : ""
              }`}
            >
              {filter.shownName}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FilterDropdown;
