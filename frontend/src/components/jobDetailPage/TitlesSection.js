import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
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
import { toast } from "react-toastify";

import { formatDate } from "../../utils/dateFormatter";
import { checkCompanyLogo } from "../../utils/checkCompanyLogo";
import { calculateRemainingDays } from "../../utils/jobRemainingDays";
import { JobsUserContext } from "../../context/jobsUserContext";
import { assignContentsToTitle } from "../../utils/urlContentsInTitle";
import { SAVE_JOB_MUTATION } from "../../graphql/mutations";
import { GET_USER_QUERY } from "../../graphql/queries";
import { toastGraphqlError } from "../../utils/toastGraphqlError";
import { noInternetHandler } from "../../utils/noInternet";

const TitlesSection = ({ job }) => {
  let { user, savedJobs, addSavedJob } = useContext(JobsUserContext);
  const navigate = useNavigate();

  const jobValues = {
    ...job,
    job_city: job.job_city === null ? "City" : job.job_city,
    user_id: user?.user_id,
  };

  // SAVE JOB MUTATION
  const [save_job_now, { loading }] = useMutation(SAVE_JOB_MUTATION, {
    variables: jobValues,
    update(cache, { data }) {
      // on db save, also save in context
      addSavedJob(data?.save_job);
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log("save job errors", graphQLErrors);
        toastGraphqlError(graphQLErrors);
      }

      if (networkError) {
        noInternetHandler();
      }
    },
  });

  // calculate the number of remaining days to expiry
  const remainingDays = calculateRemainingDays(job?.date_expiring);

  // assign default logo if company has none or link doesn't point to a logo
  const hasLogo = checkCompanyLogo(job.employer_logo);

  // share title contents
  const contentsInTitle = assignContentsToTitle(job);

  // handle save job
  const handleJobSave = () => {
    if (user) {
      return save_job_now();
    } else {
      navigate("/signin");
      return toast.info("Make sure you're signed in");
    }
  };

  // find saved jobs for styling
  const alreadySavedJob = savedJobs.find(
    (savedJob) => savedJob?.alien_job_id === job?.alien_job_id
  );

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
                  <span className="capitalize font-semibolden line-clamp-1">
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
              className={`flex gap-[0.5rem] items-center outline_button ${
                loading && "text-darkColor/40 border-darkColor/40"
              }`}
            >
              <span>{alreadySavedJob ? "Saved" : "Save"}</span>
              <span className="hidden md480:block">
                <IoBookmark />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-[0.75rem] md480:gap-[1.25rem] md480:justify-normal">
            <div className="flex gap-[0.25rem] items-center text-textColor">
              <span>Share Job</span>
              <span className="hidden text-h3 text-textColor/40 md480:block">
                <IoShareSocialOutline />
              </span>
            </div>
            <div className="flex gap-[0.5rem] md480:gap-[0.75rem]">
              <div className="detail_page_icon">
                <WhatsappShareButton
                  title={contentsInTitle}
                  url={"https://twitter.com/ptrgitonga"}
                >
                  <span>
                    <RiWhatsappFill />
                  </span>
                </WhatsappShareButton>
              </div>
              <div className="detail_page_icon">
                <TwitterShareButton
                  title={contentsInTitle}
                  url={"https://twitter.com/ptrgitonga"}
                  hashtags={[
                    "jobsearch",
                    "jobs",
                    "buildinpublic",
                    "growtogether",
                  ]}
                >
                  <span>
                    <RiTwitterXFill />
                  </span>
                </TwitterShareButton>
              </div>
              <div className="detail_page_icon">
                <LinkedinShareButton
                  title={"Job Posting!!\n\n\n"}
                  summary={contentsInTitle}
                  url={"https://twitter.com/ptrgitonga"}
                >
                  <span>
                    <RiLinkedinFill />
                  </span>
                </LinkedinShareButton>
              </div>
              <div className="detail_page_icon">
                <FacebookShareButton
                  quote={contentsInTitle}
                  url={"https://twitter.com/ptrgitonga"}
                  hashtag="jobsearch"
                >
                  <span>
                    <RiFacebookFill />
                  </span>
                </FacebookShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlesSection;
