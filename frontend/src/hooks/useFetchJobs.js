import { useState, useEffect } from "react";
import axios from "axios";

const useFetchJobs = () => {
  const [error, setError] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch request options
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      query: "fullstack development",
      pages: 1,
      num_pages: 1,
    },
  };

  // function that will make the request with the above options and update jobsData state with the returned data
  const fetchJobsData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);
      console.log(response?.data?.data);

      setJobsData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  // call the fetch function on page mount
  useEffect(() => {
    fetchJobsData();
  }, []);

  // refetch jobs
  //   const refetchJobs = () => {
  //     fetchJobsData();
  //   };

  //   return data and states from hook
  return { jobsData, loading, error };
};

export default useFetchJobs;
