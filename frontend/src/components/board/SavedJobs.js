import React from "react";
import JobCard from "../jobsFeed/JobCard";
import JobCardSkeleton from "../jobsFeed/JobCardSkeleton";

const SavedJobs = ({ jobs, loading }) => {
  return (
    <div className="flex_col gap-[1.5rem]">
      <h3 className="title_h3">Jobs you Saved</h3>

      {loading ? (
        <JobCardSkeleton />
      ) : (
        <>
          {jobs?.length > 0 ? (
            <div className="flex w-full gap-[0.75rem] flex-wrap md480:gap-[1rem] md800:gap-[1.5rem]">
              {jobs?.map((job, index) => {
                return <JobCard job={job} key={index} />;
              })}
            </div>
          ) : (
            <p>Seems like you haven't saved any jobs yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJobs;
