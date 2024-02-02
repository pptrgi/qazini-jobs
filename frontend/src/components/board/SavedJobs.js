import JobCardSkeleton from "../jobCards/JobCardSkeleton";
import SavedJobCard from "../jobCards/SavedJobCard";

const SavedJobs = ({ jobs, fetching }) => {
  return (
    <div className="flex_col gap-[1.5rem]">
      <h3 className="title_h3">Jobs you Saved</h3>

      {fetching ? (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[0.75rem] w-full md480:grid-cols-2 lg1023:grid-cols-3 md800:gap-[0.25rem] lg1023:gap-[0.5rem]">
            {[...Array(3).keys()].map((key) => (
              <JobCardSkeleton key={key} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {jobs?.length > 0 ? (
            <div className="grid grid-cols-1 gap-[0.75rem] w-full md480:grid-cols-2 lg1023:grid-cols-3 md800:gap-[0.25rem] lg1023:gap-[0.5rem]">
              {jobs?.map((job, index) => {
                return <SavedJobCard job={job} key={index} />;
              })}
            </div>
          ) : (
            <p className="tracking-wide">
              Seems like you haven't saved any jobs yet
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJobs;
