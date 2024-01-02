import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { GoBookmarkSlashFill } from "react-icons/go";
import { toast } from "react-toastify";

import { DELETE_JOB } from "../../graphql/mutations";
import { GET_USER_QUERY } from "../../graphql/queries";
import { checkCompanyLogo } from "../../utils/checkCompanyLogo";
import { toastGraphqlError } from "../../utils/toastGraphqlError";
import { calculateRemainingDays } from "../../utils/jobRemainingDays";
import { noInternetHandler } from "../../utils/noInternet";
import { convertMsDateToISO } from "../../utils/msDateToISO";

const SavedJobCard = ({ job }) => {
  const navigate = useNavigate();

  let {
    job_id,
    employer_name,
    employer_logo,
    employer_website,
    alien_job_id,
    employment_type,
    job_title,
    apply_link,
    date_expiring,
    date_posted,
    job_country,
  } = job;

  // convert dates in milliseconds to ISO dates
  date_expiring = convertMsDateToISO(date_expiring);
  date_posted = convertMsDateToISO(date_posted);

  const [delete_job_now, { loading }] = useMutation(DELETE_JOB, {
    variables: { job_id },
    update(cache, { data }) {
      console.log("delete job data", data);
      toast.success("Job has been deleted");

      const { get_user } = cache.readQuery({ query: GET_USER_QUERY });

      cache.writeQuery({
        query: GET_USER_QUERY,
        data: {
          get_user: get_user.jobs?.filter((job) => job.job_id !== data?.job_id),
        },
      });
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log("delete job errors", graphQLErrors);
        toastGraphqlError(graphQLErrors);
      }

      if (networkError) {
        noInternetHandler();
      }
    },
  });

  const handleDeleteJob = () => {
    delete_job_now();
  };

  // calculate the number of active days
  const remainingDays = calculateRemainingDays(date_expiring);

  // handle view job
  const handleViewJob = () => {
    navigate(`/job/${alien_job_id}`, {
      state: {
        job_details: job,
      },
    });
  };

  // assign default logo if company has none or link doesn't point to a logo
  const hasLogo = checkCompanyLogo(employer_logo);

  return (
    <div className="job_card_wrapper">
      <div className="flex_col gap-[1.25rem] items-start">
        <div className="flex_between w-full items-center">
          <div className="relative h-[45px] w-[100px] flex_center overflow-hidden">
            <img
              src={`${
                hasLogo ? employer_logo : "/company_logo_placeholder.png"
              }`}
              className="absolute object-cover z-0"
            />
          </div>
          <span
            onClick={(e) => handleDeleteJob()}
            className={`text-h3 text-red-500 hover:text-red-600 trans_200 ${
              loading && "text-red-500/30"
            }`}
          >
            <GoBookmarkSlashFill />
          </span>
        </div>
        <div className="flex_col gap-[1rem]">
          <div className="flex_col gap-[0.5rem]">
            <h2 className="title_h3 lines_limit_2 min-h-[3.7rem] md800:title_h2">
              {job_title}
            </h2>
            <span className="text-smaller line-clamp-1 md480:text-small">
              At
              <span className="text-darkColor hover:text-ctaColor transition duration-200">
                {/* if there's company website url make it a link, otherwise just show name */}{" "}
                {employer_website === null ? (
                  <span className=" cursor-default">{employer_name}</span>
                ) : (
                  <a href={`${employer_website}`}>{`${employer_name}`}</a>
                )}
              </span>
              , {`${job_country}`}
            </span>
          </div>
          <div className="flex_col gap-[0.25rem]">
            <span className="capitalize">{employment_type}</span>
            <p>
              {/* A job can have no expiry, have active days or be expired */}
              {date_expiring === null
                ? "No Expiry"
                : `${
                    remainingDays
                      ? `Expires in ${remainingDays} days`
                      : "Expired"
                  }`}
            </p>
          </div>
        </div>

        {date_expiring === null || remainingDays ? (
          <div className="flex_between w-full items-center">
            <div className="group">
              <a
                href={`${apply_link}`}
                className="flex gap-[0.5rem] items-center cta_button xm:gap-[0.5rem] md800:px-[1.5rem]"
              >
                <span>Apply</span>
                <span className="text-normal">
                  <IoOpenOutline />
                </span>
              </a>
            </div>
            <div className="group">
              <div
                onClick={handleViewJob}
                className="flex gap-[0.25rem] outline_button md800:px-[1.5rem]"
              >
                <span>View</span>
                <span className="block md800:hidden lg1023:block">Job</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full items-center">
            <button
              onClick={(e) => handleDeleteJob()}
              className={`w-full bg-red-500 text-center tracking-wide text-bodyColor py-[0.75rem] rounded-full hover:bg-red-600 trans_200 ${
                loading && "bg-red-500/30"
              }`}
            >
              Delete Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobCard;
