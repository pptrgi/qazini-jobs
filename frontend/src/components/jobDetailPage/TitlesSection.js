import {
  IoBookmark,
  IoLogoWhatsapp,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";
import { PiDotBold, PiShare } from "react-icons/pi";

import { jobsData } from "../jobsFeed/JobsData";
import { formatDate } from "../../utils/dateFormatter";

const TitlesSection = ({ job }) => {
  let remainingDays;
  if (job?.date_expiring !== null) {
    remainingDays = job.date_expiring - new Date();
  }
  return (
    <div className="flex_col gap-[2rem]">
      <h4 className="uppercase tracking-widest text-smaller md480:text-small">
        job details
      </h4>
      <div className="flex_col gap-[1rem]">
        {/* title, company name, location, dates */}
        <div className="flex_col gap-[0.5rem]">
          <h2 className="title_h2 lines_limit_2">{job?.job_title}</h2>
          <div className="flex gap-[0.5rem] items-center">
            <img
              src={`${job?.employer_logo}`}
              alt="logo"
              className="w-[30px]"
            />
            <div className="flex gap-[0.125rem] items-center truncate">
              <p className="capitalize text-titleColor">{job?.employer_name}</p>
              <span className="text-h2">
                <PiDotBold />
              </span>

              <p className="capitalize">{`${job?.job_city}, ${job?.job_country}`}</p>
            </div>
          </div>
        </div>
        <div className="flex_col gap-[0.75rem]">
          <div className="grid grid-cols-2 gap-[0.25rem] md800:grid-cols-3">
            <div className="flex gap-2">
              <span>Posted: </span>
              <span>{formatDate(job?.date_posted)}</span>
            </div>

            {job?.date_expiring == null ? (
              <span>No Expiry</span>
            ) : (
              <div className="flex gap-2">
                <span>Expiry: </span>
                <span>{formatDate(job?.date_expiring)}</span>
              </div>
            )}

            {job?.date_expiring !== null && (
              <p>Remaining: {`${remainingDays} days`} </p>
            )}
          </div>
          <div className="flex gap-[0.5rem]">
            <p>Job Type:</p>
            <span className="uppercase"> {`${job?.employment_type}`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full gap-[0.75rem] md800:flex-row">
        <div className="flex_between gap-2 w-full md800:w-1/2">
          <a
            href={`${job?.apply_link}`}
            className="cta_button w-[70%] text-center truncate md800:min-w-fit"
          >
            Apply Now
          </a>
          <div className="flex gap-[0.5rem] items-center outline_button">
            <span>Save</span>
            <span className="hidden md480:block">
              <IoBookmark />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[0.5rem] md480:flex-row md480:gap-[1.25rem]">
          <div className="flex gap-[0.25rem] items-center">
            <span>Share job</span>
            <span className="text-h3">
              <PiShare />
            </span>
          </div>
          {/* <span className="block border-b-[1px] border-textColor md480:hidden"></span>
          <span className="hidden border-r-[1px] border-textColor md480:block"></span> */}
          <div className="flex gap-[0.75rem]">
            <span className="text-h3 text-gray-400">
              <IoLogoWhatsapp />
            </span>
            <span className="text-h3 text-gray-400">
              <IoLogoLinkedin />
            </span>
            <span className="text-h3 text-gray-400">
              <IoLogoTwitter />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlesSection;
