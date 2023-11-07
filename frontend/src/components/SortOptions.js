import React from "react";

const SortOptions = ({ setSort, closeSortOptions }) => {
  const sortOptions = [
    { name: "default", value: "" },
    { name: "expiring soon", value: "date_expiring" },
    { name: "newest first", value: "-date_expiring" },
  ];
  return (
    <div className="w-[150px] bg-tintColor rounded-lg shadow-lg px-[1rem]">
      <div className="flex_col items-start w-full">
        {sortOptions.map((option, index) => {
          return (
            <span
              key={index}
              onClick={(e) => setSort(option.name) && closeSortOptions()}
              className="py-[0.3rem] capitalize w-full cursor-pointer hover:text-tintClearColor"
            >
              {option.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SortOptions;
