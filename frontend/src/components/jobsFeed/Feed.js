import { useContext, useState, useRef } from "react";
import { PiCaretUpDown } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { LiaSortDownSolid, LiaSortUpSolid } from "react-icons/lia";

import { JobsUserContext } from "../../context/jobsUserContext";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import SortOptions from "../SortOptions";
import useClickOutsideClose from "../../hooks/useClickOutsideClose";

const Feed = ({ loading }) => {
  const context = useContext(JobsUserContext);
  const jobs = context.jobs;

  const [currentSort, setCurrentSort] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef();

  // close the sort options popup on outside click
  useClickOutsideClose(sortRef, () => setShowSortOptions(false));
  return (
    <section className="custom_container section">
      <div className="flex_col gap-[1.5rem] items-start">
        <div className="flex_col gap-[0.75rem]">
          <h2 className="title_h3">Available Opportunities</h2>
          <div className="flex_col gap-[0.25rem]">
            <span className="capitalize text-smaller md480:text-small">
              {`${jobs.length} jobs found`}
            </span>
            <div className="flex gap-[1rem]">
              <div className="flex gap-[0.125rem] items-center">
                <span>Sort by</span>
                <span>
                  <PiCaretUpDown />
                </span>
              </div>
              <div className="relative">
                <div
                  className="group cursor-pointer"
                  onClick={(e) => setShowSortOptions(true)}
                >
                  <div className="flex gap-[0.75rem] items-center border_1_md px-[0.75rem] py-[0.35rem]">
                    <span className="capitalize">
                      {currentSort === "" ? "default" : currentSort}
                    </span>
                    <span>
                      {showSortOptions ? <IoChevronUp /> : <IoChevronDown />}
                    </span>
                  </div>
                </div>
                {showSortOptions && (
                  <div ref={sortRef} className="absolute top-[2.5rem] left-0">
                    <SortOptions
                      setSort={(sortValue) => setCurrentSort(sortValue)}
                      closeSortOptions={() => setShowSortOptions(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <JobCardSkeleton />
        ) : (
          <div className="flex w-full gap-[0.75rem] flex-wrap md480:gap-[1rem] md800:gap-[1.5rem]">
            {jobs?.map((job, index) => {
              return <JobCard job={job} key={index} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
