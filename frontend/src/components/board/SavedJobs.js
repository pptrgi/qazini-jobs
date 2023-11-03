import React from "react";
import JobCard from "../jobsFeed/JobCard";
import JobCardSkeleton from "../jobsFeed/JobCardSkeleton";

const SavedJobs = ({ jobs }) => {
  return (
    <div className="flex_col gap-[1.5rem]">
      <h3 className="title_h3">Jobs you Saved</h3>
      <JobCardSkeleton />

      {jobs?.length > 0 && (
        <div>
          {jobs?.map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
