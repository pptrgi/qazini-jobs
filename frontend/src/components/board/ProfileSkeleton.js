const ProfileSkeleton = () => {
  return (
    <div className="profile_skeleton_wrapper">
      <div className="flex_col gap-[1.5rem]">
        {/* <span className="skeleton_section_title"></span> */}
        <h3 className="title_h3">Manage Account</h3>
        <div className="flex_col gap-[2rem]">
          <div className="flex_col gap-[0.75rem]">
            <span className="skeleton_section_subtitle"></span>
            <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
              <span className="skeleton_form_input"></span>
              <span className="skeleton_form_input"></span>
            </div>
          </div>

          <div className="flex_col gap-[0.75rem]">
            <span className="skeleton_section_subtitle"></span>
            <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
              <span className="skeleton_form_input"></span>
              <span className="skeleton_form_input"></span>
            </div>
          </div>
          <div className="flex gap-[1rem]">
            <span className="skeleton_profile_button"></span>
            <span className="skeleton_profile_button"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
