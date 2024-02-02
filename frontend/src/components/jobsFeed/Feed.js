import { useContext, useState, useRef, useEffect } from "react";
import { PiCaretUpDown } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";

import { JobsUserContext } from "../../context/jobsUserContext";
import FeedJobCard from "../jobCards/FeedJobCard";
import JobCardSkeleton from "../jobCards/JobCardSkeleton";
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

  useEffect(() => {
    jobs = sortJobs(jobs, currentSort);
  }, [currentSort]);

  // close the sort options popup on outside click
  useClickOutsideClose(sortRef, () => setShowSortOptions(false));

  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container feed_section border-b-[1.5px] border-lightGrayColor/70"
    >
      <div className="relative flex_col gap-[1.5rem] items-start overflow-hidden">
        <div className="flex_col gap-[0.75rem]">
          <h2 className="title_h3 md480:text-h2">Available Opportunities</h2>
          <div className="flex_col gap-[0.25rem]">
            <span className="capitalize text-smaller tracking-wide md480:text-small">
              {`${jobs?.length ? `${jobs.length} jobs found` : "0 jobs found"}`}
            </span>
            <div className="flex gap-[1rem]">
              <div className="flex gap-[0.125rem] items-center">
                <span className="tracking-wide">Sort by</span>
                <span>
                  <PiCaretUpDown />
                </span>
              </div>
              <div className="relative">
                <div
                  className="group cursor-pointer"
                  onClick={(e) => setShowSortOptions(true)}
                >
                  <div className="flex gap-[0.5rem] items-center border-[1.8px] border-textColor/20 rounded-lg px-[0.75rem] py-[0.35rem] text-textColor/80 group-hover:text-darkColor group-hover:border-darkColor trans_200">
                    <span className="capitalize">{currentSort}</span>
                    <span className="text-textColor/40">
                      {showSortOptions ? <IoChevronUp /> : <IoChevronDown />}
                    </span>
                  </div>
                </div>
                {showSortOptions && (
                  <div
                    ref={sortRef}
                    className="absolute top-[2.5rem] left-0 z-30"
                  >
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
              <div className="grid grid-cols-1 gap-[0.75rem] w-full md480:grid-cols-2 md800:grid-cols-3 lg1023:grid-cols-4 md800:gap-[0.25rem] lg1023:gap-[0.5rem]">
                {[...Array(4).keys()].map((index) => {
                  return <JobCardSkeleton key={index} />;
                })}
              </div>
            ) : (
              <>
                {jobs?.length > 0 ? (
                  <div className="grid grid-cols-1 w-full gap-[0.75rem] md480:grid-cols-2 md800:grid-cols-3 lg1023:grid-cols-4 md800:gap-[0.25rem] lg1023:gap-[0.5rem]">
                    {jobs?.map((job, index) => {
                      return <FeedJobCard job={job} key={index} />;
                    })}
                  </div>
                ) : (
                  <p className="text-normal tracking-wide z-10 md480:text-h3">
                    Sorry, no jobs were found.
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <p className="text-red-500 tracking-wide font-semibolden">
            {/* You're not connected to the internet */}
            {error == "Request failed with status code 429" ? (
              <span>
                Apparently, we have exhausted our freemium quota limit with
                RapidAPI.
                <br /> That means we can't fetch any more jobs for free. Sorry.
              </span>
            ) : (
              <span>{error}</span>
            )}
          </p>
        )}
        <FillWithMotiv />
      </div>
    </motion.section>
  );
};

export default Feed;
