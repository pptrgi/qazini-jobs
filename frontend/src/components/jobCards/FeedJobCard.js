import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBookmark, IoOpenOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import { SAVE_JOB_MUTATION } from "../../graphql/mutations";
import { GET_USER_QUERY } from "../../graphql/queries";
import { JobsUserContext } from "../../context/jobsUserContext";
import { checkCompanyLogo } from "../../utils/checkCompanyLogo";
import { toastGraphqlError } from "../../utils/toastGraphqlError";
import { calculateRemainingDays } from "../../utils/jobRemainingDays";
import { noInternetHandler } from "../../utils/noInternet";

const JobCard = ({ job }) => {
  const { user } = useContext(JobsUserContext);
  const navigate = useNavigate();

  let {
    employer_name,
    employer_logo,
    employer_website,
    company_type,
    alien_job_id,
    employment_type,
    job_title,
    apply_link,
    job_description,
    job_qualifications,
    job_responsibilities,
    date_posted,
    date_expiring,
    job_city,
    job_country,
  } = job;

  const jobValues = {
    ...job,
    job_city: job_city === null ? "City" : job_city,
    user_id: user?.user_id,
  };

  const [save_job_now, { loading }] = useMutation(SAVE_JOB_MUTATION, {
    variables: jobValues,
    update(cache, { data }) {
      console.log("save job data", data);
      toast.success("Job has been saved");

      const { get_user } = cache.readQuery({ query: GET_USER_QUERY });

      cache.writeQuery({
        query: GET_USER_QUERY,
        data: { get_user: [...get_user.jobs, data.save_job] },
      });
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

  const handleJobSave = () => {
    if (user) {
      return save_job_now();
    } else {
      navigate("/signin");
      return toast.info("Make sure you're signed in");
    }
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
            onClick={(e) => handleJobSave()}
            className={`text-h3 hover:text-ctaColor trans_200 ${
              loading && "text-textColor/25"
            }`}
          >
            <IoBookmark />
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
              className="flex gap-[0.25rem]  outline_button md800:px-[1.5rem]"
            >
              <span>View</span>
              <span className="block md800:hidden lg1023:block">Job</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
