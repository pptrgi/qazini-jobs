const JobCardSkeleton = () => {
  return (
    <div className="skeleton_card_wrapper z-10">
      <div className="flex_col gap-[1.5rem] w-full items-start">
        <div className="flex_between w-full">
          <span className="skeleton_com_logo"></span>
          <span className="skeleton_bookmark"></span>
        </div>
        <div className="flex_col gap-[1.25rem] w-full">
          <div className="flex_col gap-[1rem]">
            <div className="flex_col gap-[0.25rem]">
              <span className="skeleton_job_title_1"></span>
              <span className="skeleton_job_title_2"></span>
            </div>
            <span className="skeleton_com_name"></span>
          </div>
          <div className="flex_col gap-[0.25rem]">
            <span className="skeleton_job_type"></span>
            <span className="skeleton_expires_in"></span>
          </div>
        </div>
        <div className="flex_between w-full items-center gap-[0.75rem]">
          <span className="skeleton_button"></span>
          <span className="skeleton_button"></span>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
