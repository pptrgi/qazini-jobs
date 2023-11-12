import axios from "axios";

export const jobsFetcher = async (searchText) => {
  /*
  Accepts the search text to be used in query param
  Returns either an array of jobs or an error message
  */

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "de8798e5a5msh4ea80eadd2055e1p13fa19jsna581fd2c58b4",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      query: `${searchText}`,
      pages: 1,
      num_pages: 1,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response?.data?.data);

    let readyToGoJobs = [];

    response?.data?.data?.map((job) => {
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
      });
    });

    return readyToGoJobs;
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};
