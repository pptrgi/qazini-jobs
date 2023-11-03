import { useContext } from "react";
import { PiCaretUpDown } from "react-icons/pi";
import { IoCaretDownOutline } from "react-icons/io5";

import { JobsUserContext } from "../../context/jobsUserContext";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";

const Feed = () => {
  const context = useContext(JobsUserContext);
  const jobs = context.jobs;

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
              <div className="group">
                <div className="flex gap-[0.5rem] items-center text-titleColor">
                  <span>Latest</span>
                  <span>
                    <IoCaretDownOutline />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <JobCardSkeleton /> */}
        <div className="flex w-full gap-[0.75rem] flex-wrap md480:gap-[1rem] md800:gap-[1.5rem]">
          {jobs?.map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Feed;
