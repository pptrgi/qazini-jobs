import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoBookmark, IoShareSocialOutline } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  RiTwitterXFill,
  RiWhatsappFill,
  RiLinkedinFill,
  RiFacebookFill,
} from "react-icons/ri";

import { formatDate } from "../../utils/dateFormatter";
import { checkCompanyLogo } from "../../utils/checkCompanyLogo";
import { calculateRemainingDays } from "../../utils/jobRemainingDays";
import { JobsUserContext } from "../../context/jobsUserContext";
import { toast } from "react-toastify";

const TitlesSection = ({ job }) => {
  // calculate the number of remaining days to expiry
  const remainingDays = calculateRemainingDays(job?.date_expiring);

  // assign default logo if company has none or link doesn't point to a logo
  const hasLogo = checkCompanyLogo(job.employer_logo);

  // share title contents
  const contentsInTitle = `${job?.job_title}\n\nAt ${
    job?.employer_name
  }\nPosted: ${formatDate(job.date_posted)}\n${
    job?.date_expiring
      ? `Deadline: ${formatDate(job.date_expiring)}`
      : "No Deadline"
  }\n${
    job?.date_expiring
      ? `Remaining: ${calculateRemainingDays(job.date_expiring)} days`
      : "Open Applications"
  }\nEmployment type - ${job?.employment_type}\nApply link: ${
    job?.apply_link
  }\n\nShared with love by Qazini's founder p.Gitonga. Check us out`;

  // handle save job
  const { user } = useContext(JobsUserContext);
  const navigate = useNavigate();

  const handleJobSave = () => {
    if (user) {
      return toast.success("Job save is under implementation. Coming soon");
    } else {
      navigate("/signin");
      return toast.info("Make sure you're signed in");
    }
  };

  return (
    <div className="flex_center w-full">
      <div className="flex_col gap-[2.25rem] items-center w-full">
        <h4 className="uppercase tracking-widest text-smaller md480:text-small">
          job details
        </h4>
        <div className="flex_col gap-[1.5rem] items-center">
          {/* title, company name, location, dates */}
          <div className="flex_col gap-[0.5rem] items-center">
            <h2 className="title_h2 lines_limit_2 text-center md480:max-w-md">
              {job?.job_title}
            </h2>
            <div className="flex gap-[0.5rem] items-center">
              <img
                src={`${
                  hasLogo ? job.employer_logo : "/job_logo_placeholder.svg"
                }`}
                alt="logo"
                className="w-[30px]"
              />
              <div className="flex gap-[0.25rem] items-center">
                <p className="capitalize text-darkColor max-w-[150px] line-clamp-1 hover:font-semibolden md480:max-w-none">
                  {job?.employer_website === null ? (
                    <span>{job?.employer_name}</span>
                  ) : (
                    <a
                      href={`${job?.employer_website}`}
                    >{`${job?.employer_name}`}</a>
                  )}
                </p>

                <span className="text-h3 max-w-[18px] text-textColor/50 md480:max-w-none">
                  <RxDotFilled />
                </span>

                <p className="capitalize max-w-[100px] line-clamp-1 md480:max-w-none">
                  {job?.job_country}
                </p>
              </div>
            </div>
          </div>
          <div className="flex_col gap-[0.75rem]">
            <div className="grid grid-cols-2 gap-[0.25rem] md480:grid-cols-3 md480:gap-[0.75rem]">
              <div className="flex gap-[0.25rem] md480:gap-[0.5rem]">
                <span>Posted: </span>
                <span className="font-semibolden">
                  {formatDate(job?.date_posted)}
                </span>
              </div>

              {job?.date_expiring == null ? (
                <span className="font-semibolden">No Expiry</span>
              ) : (
                <div className="flex gap-[0.25rem] md480:gap-[0.5rem]">
                  <span>Expiry: </span>
                  <span className="font-semibolden">
                    {formatDate(job?.date_expiring)}
                  </span>
                </div>
              )}

              {job?.date_expiring !== null && (
                <div className="flex gap-[0.25rem] md480:gap-[0.5rem]">
                  <span>Remaining: </span>

                  <p className="truncate font-semibolden">
                    {`${remainingDays ? `${remainingDays} days` : "Expired"}`}
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-[0.75rem] md480:gap-[1rem]">
              <div className="flex gap-[0.25rem] md480:gap-[0.5rem]">
                <p className="truncate">Job type:</p>
                <span className="uppercase font-semibolden">
                  {" "}
                  {`${job?.employment_type}`}
                </span>
              </div>
              {job?.company_type && (
                <div className="flex gap-[0.25rem] md480:gap-[0.5rem]">
                  <p className="truncate">Company type:</p>
                  <span className="capitalize font-semibolden">
                    {" "}
                    {`${job?.company_type}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-[0.75rem] md480:flex-row md480:w-full">
          <div className="flex_between gap-2 w-full md480:w-1/2">
            <a
              href={`${job?.apply_link}`}
              className="cta_button w-[70%] text-center truncate md480:min-w-fit"
            >
              Apply Now
            </a>
            <div
              onClick={(e) => handleJobSave()}
              className="flex gap-[0.5rem] items-center outline_button"
            >
              <span>Save</span>
              <span className="hidden md480:block">
                <IoBookmark />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[1.25rem]">
            <div className="flex gap-[0.25rem] items-center text-textColor">
              <span>Share Job</span>
              <span className="text-h3 text-textColor/40">
                <IoShareSocialOutline />
              </span>
            </div>
            <div className="flex gap-[0.75rem]">
              <WhatsappShareButton
                title={contentsInTitle}
                url={"https://qazini-jobs.vercel.app"}
              >
                <span className="text-[1rem] text-titleColor/60 hover:text-ctaColor trans_200">
                  <RiWhatsappFill />
                </span>
              </WhatsappShareButton>
              <TwitterShareButton
                title={contentsInTitle}
                url={"https://qazini-jobs.vercel.app"}
                hashtags={[
                  "#jobsearch",
                  "#jobs",
                  "#buildinpublic",
                  "#growtogether",
                ]}
              >
                <span className="text-[1rem] text-titleColor/60 hover:text-ctaColor trans_200">
                  <RiTwitterXFill />
                </span>
              </TwitterShareButton>
              <LinkedinShareButton
                title={"Job Posting"}
                summary={contentsInTitle}
                url={"https://qazini-jobs.vercel.app"}
              >
                <span className="text-[1rem] text-titleColor/60 hover:text-ctaColor trans_200">
                  <RiLinkedinFill />
                </span>
              </LinkedinShareButton>
              <FacebookShareButton
                title={contentsInTitle}
                url={"https://qazini-jobs.vercel.app"}
                hashtag="#jobsearch"
              >
                <span className="text-[1rem] text-titleColor/60 hover:text-ctaColor trans_200">
                  <RiFacebookFill />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlesSection;
