import axios from "axios";
import { toast } from "react-toastify";

export const jobsFetcher = async (searchText, searchCount) => {
  /*
  Accepts the search text to be used in query param
  Returns either an array of jobs or an error message
  */

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "d421eb3eefmsh5929106c95202e4p18c5a5jsn26f629ec2510",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      query: `${searchText}`,
      pages: 1,
      num_pages: 1,
    },
  };

  if (searchCount <= 1) {
    if (searchCount == 1) {
      const timeSearchMaxReached = new Date().getTime();
      localStorage.setItem("timeSearchMaxReached", timeSearchMaxReached);
    }
    try {
      const response = await axios.request(options);

      let readyToGoJobs = [];

      response?.data?.data?.map((job) =>
        readyToGoJobs.push({
          employer_name: job.employer_name,
          employer_logo: job.employer_logo,
          employer_website: job.employer_website,
          company_type: job.employer_company_type,
          alien_job_id: job.job_id,
          employment_type: job.job_employment_type,
          job_title: job.job_title,
          apply_link: job.job_apply_link,
          job_description: job.job_description,
          job_qualifications: job.job_highlights.Qualifications,
          job_responsibilities: job.job_highlights.Responsibilities,
          date_posted: job.job_posted_at_datetime_utc,
          date_expiring: job.job_offer_expiration_datetime_utc,
          job_city: job.job_city,
          job_country: job.job_country,
        })
      );

      return readyToGoJobs;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  } else {
    const currentTime = new Date().getTime();

    const readConditions = () => {
      return {
        storedTime: localStorage.getItem("timeSearchMaxReached"),
      };
    };
    const { storedTime } = readConditions();

    const noSearchPeriod = 24 * 60 * 60 * 1000; // 24hrs
    const periodStillActive =
      currentTime - parseInt(storedTime) < noSearchPeriod;

    if (periodStillActive) {
      toast.error("You can only perform 3 searches in 24hrs");
      return "You can only perform 3 searches in 24hrs";
    } else {
      localStorage.removeItem("searchCount");
      localStorage.removeItem("timeSearchMaxReached");

      toast.error("Sorry didn't quite catch that, search again");
      localStorage.setItem("searchCount", 0);
    }
  }
};
