import { useContext, useState, useRef, useEffect } from "react";
import { PiCaretUpDown } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";

import { JobsUserContext } from "../../context/jobsUserContext";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import SortOptions from "../SortOptions";
import useClickOutsideClose from "../../hooks/useClickOutsideClose";
import { sortJobs } from "../../utils/sortJobs";
import { fadeOutVariants } from "../../transitions/transitions";

const Feed = ({ loading, error }) => {
  const context = useContext(JobsUserContext);
  let jobs = context.jobs;

  const [currentSort, setCurrentSort] = useState("default");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef();

  useEffect(() => {
    jobs = sortJobs(jobs, currentSort);
  }, [currentSort]);

  // close the sort options popup on outside click
  useClickOutsideClose(sortRef, () => setShowSortOptions(false));
  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container section"
    >
      <div className="flex_col gap-[1.5rem] items-start">
        <div className="flex_col gap-[0.75rem]">
          <h2 className="title_h3">Available Opportunities</h2>
          <div className="flex_col gap-[0.25rem]">
            <span className="capitalize text-smaller md480:text-small">
              {`${jobs?.length} jobs found`}
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
                    <span className="capitalize">{currentSort}</span>
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
        {/* check for error and loading states when fetching jobs */}
        {!error ? (
          <>
            {loading ? (
              <JobCardSkeleton />
            ) : (
              <div className="flex w-full gap-[0.75rem] flex-wrap md480:gap-[1rem] md800:gap-[1.5rem]">
                {jobs?.map((job, index) => {
                  return <JobCard job={job} key={index} />;
                })}
              </div>
            )}{" "}
          </>
        ) : (
          <p className="text-red-500 tracking-wide font-semibolden">
            {/* You're not connected to the internet */}
            {error}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default Feed;
