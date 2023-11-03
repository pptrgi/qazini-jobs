import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBookmark, IoOpenOutline } from "react-icons/io5";

import { SAVE_JOB_MUTATION } from "../../graphql/mutations";
import { GET_USER_QUERY } from "../../graphql/queries";
import { JobsUserContext } from "../../context/jobsUserContext";

const JobCard = ({ job }) => {
  const context = useContext(JobsUserContext);
  const user = context.user;
  const navigate = useNavigate();

  const {
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
    user_id: 1,
  };

  const [save_job_now, { loading }] = useMutation(SAVE_JOB_MUTATION, {
    variables: jobValues,
    update(cache, { data }) {
      console.log("save job data", data);
      const { get_user } = cache.readQuery({ query: GET_USER_QUERY });

      cache.writeQuery({
        query: GET_USER_QUERY,
        data: { get_user: [...get_user.jobs, data.save_job] },
      });
    },
    onError({ graphQLErrors }) {
      console.log("save job erros", graphQLErrors);
    },
  });

  const handleJobSave = () => {
    save_job_now();
  };

  // calculate the number of active days
  const activeInDays = Math.floor(
    (new Date(date_expiring) - new Date(date_posted)) / 86400000
  );

  // handle view job
  const handleViewJob = () => {
    navigate(`/job/${alien_job_id}`, {
      state: {
        job_details: job,
      },
    });
  };

  // check job saved - alien_job_id
  if (loading) console.log("save job loading...");

  return (
    <div className="job_card_wrapper">
      <div className="flex_col gap-[1.25rem] items-start">
        <div className="flex_between w-full">
          <img src={`${employer_logo}`} className="w-[60px] min-h-[60px]" />
          {/* <img src="/logo192.png" className="w-[60px] min-h-[60px]" /> */}
          <span onClick={(e) => handleJobSave()} className="text-h3">
            <IoBookmark />
          </span>
        </div>
        <div className="flex_col gap-[1rem]">
          <div className="flex_col gap-[0.5rem]">
            <h2 className="title_h3 lines_limit_2 min-h-[3.7rem] md800:title_h2">
              {job_title}
            </h2>
            <span className="text-smaller md480:text-small">
              At <span className="text-titleColor">{`${employer_name}`}</span>,{" "}
              {`${job_country}`}
            </span>
          </div>
          <div className="flex_col gap-[0.25rem]">
            <span className="capitalize">{employment_type}</span>

            <p>
              {date_expiring === null
                ? "No Expiry"
                : `Expires in ${activeInDays} days`}
            </p>
          </div>
        </div>

        <div className="flex_between w-full items-center">
          <div className="group">
            <a
              href={`${apply_link}`}
              className="flex gap-[0.75rem] items-center cta_button xm:gap-[0.5rem]"
            >
              <span>Apply</span>
              <span className="text-normal">
                <IoOpenOutline />
              </span>
            </a>
          </div>
          <div className="group">
            <div onClick={handleViewJob} className="outline_button ">
              <span>View Job</span>
            </div>
            {/* <Link to={`/job/${alien_job_id}`} className="outline_button ">
              <span>View Job</span>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
