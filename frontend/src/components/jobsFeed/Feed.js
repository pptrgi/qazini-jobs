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
import FillWithMotiv from "../FillWithMotiv";

const Feed = ({ loading, error }) => {
  const context = useContext(JobsUserContext);
  let jobs = context.jobs;

  const [currentSort, setCurrentSort] = useState("default");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef();

  // useEffect(() => {
  //   jobs = sortJobs(jobs, currentSort);
  // }, [currentSort]);

  // close the sort options popup on outside click
  useClickOutsideClose(sortRef, () => setShowSortOptions(false));
  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container section"
    >
      <div className="relative flex_col gap-[1.5rem] items-start overflow-hidden">
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
              <>
                {jobs?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-[0.5rem] md480:grid-cols-2 md800:grid-cols-2 lg1023:grid-cols-3">
                    {jobs?.map((job, index) => {
                      return <JobCard job={job} key={index} />;
                    })}
                  </div>
                ) : (
                  <p className="text-normal md480:text-h3">
                    Sorry, no jobs found
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <p className="text-red-500 tracking-wide font-semibolden">
            {/* You're not connected to the internet */}
            {error}
          </p>
        )}
        {/* {/* <span className="hidden justify-center items-center h-full md480:flex">
          <span className="absolute right-[2rem] top-[30%] w-[16px] h-[16px] rotate-45 bg-tintClearColor/50"></span>
          <span className="absolute right-[2.5rem] top-[28%] w-[12px] h-[12px] rounded-full bg-tintClearColor/50"></span>
          <span className="absolute right-[3.5rem] top-[27%] w-[10px] h-[10px] rotate-45 bg-tintClearColor/50"></span>
          <span className="absolute right-[2rem] top-[25%] w-[8px] h-[8px] rounded-full bg-tintClearColor/50"></span>
          <span className="absolute right-[2.75rem] top-[24%] w-[6px] h-[6px] rotate-45 bg-tintClearColor/50"></span>
        </span> 
        <span className="hidden absolute -right-[150px] justify-center items-center h-full gap-[0.4rem] md480:flex">
          <span className="w-[200px] bg-tintClearColor/10 h-[30%] rounded-full"></span>
        </span> */}
        <FillWithMotiv />
      </div>
    </motion.section>
  );
};

export default Feed;
