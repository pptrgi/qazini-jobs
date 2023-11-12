import { createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

// create a single context for jobs and user, and initialize the values
// immutableJobs array holds the original jobs list, jobs array gets updated dynamically
const JobsUserContext = createContext({
  jobs: [],
  immutableJobs: [],
  user: null,
  signin: (userData) => {},
  signout: () => {},
  setJobs: (jobsArray) => {},
  filterJobs: (filterProperty, filterValue) => {},
  searchJobs: (searchText) => {},
  populateJobs: (jobsArray) => {},
});

// define action types and how they update state
const jobsUserReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload };
    case "SIGNOUT":
      return { ...state, user: null };
    case "SETJOBS":
      return { ...state, jobs: action.payload };
    case "SEARCH":
      return { ...state, jobs: action.payload };
    case "FILTER":
      return { ...state, jobs: action.payload };
    case "POPULATEJOBS":
      return { ...state, immutableJobs: action.payload, jobs: action.payload };
    default:
      return state;
  }
};

// EXTRAS - auth operations **********************************************
const userState = {
  user: null,
};

if (localStorage.getItem("userToken")) {
  // decode the token and assign decoded user details to user state object
  // as long as there's a token, this makes sure the user details in user state are always there even when page is refreshed
  const savedToken = localStorage.getItem("userToken");
  const decodedUserDetails = jwtDecode(savedToken);

  userState.user = decodedUserDetails;
}
// *************************************************************************

// context provider that makes the context available to all child components
// dispatch reducer actions specifying what exact payload goes to each action type(as a result, affecting state values) with the help of context methods
// include the state values and methods in the context provider
const JobsUserProvider = (props) => {
  const [state, dispatch] = useReducer(jobsUserReducer, {
    jobs: [],
    user: userState.user,
  });

  // sign in
  // accepts the user details received from backend and sets it as the action payload
  const signin = (userData) => {
    // save token to storage
    localStorage.setItem("userToken", userData?.token);

    dispatch({
      type: "SIGNIN",
      payload: userData,
    });
  };

  // sign out
  // nullifies the user data and deletes token from storage
  const signout = () => {
    localStorage.removeItem("userToken");

    dispatch({
      type: "SIGNOUT",
    });
  };

  // sets jobs to both the mutable and original arrays
  const populateJobs = (jobsArray) => {
    dispatch({
      type: "POPULATEJOBS",
      payload: jobsArray,
    });
  };

  // set jobs
  // sets the jobs state to the jobs array received from RapidAPI JSearch
  const setJobs = (jobsArray) => {
    dispatch({
      type: "SETJOBS",
      payload: jobsArray,
    });
  };

  // filter jobs
  // accepts the job object property and value that'll be used to filter down the jobs array
  const filterJobs = (filterProperty, filterValue) => {
    let jobs = [...state.immutableJobs];

    jobs = jobs.filter((job) => job[filterProperty] == filterValue);

    dispatch({
      type: "FILTER",
      payload: jobs,
    });
  };

  // **************************** CURRENTLY SEARCHING THE API INSTEAD ***************************************
  // search for jobs
  // receives a search text whose pattern is matched with job title, location or description fields
  const searchJobs = (searchText) => {
    const regex = new RegExp(`${searchText}`, "i"); // i for case insensitivity
    let jobs = [...state.immutableJobs];

    jobs = jobs.filter(
      (job) =>
        regex.test(job.job_title) ||
        regex.test(job.company_type) ||
        regex.test(job.job_description) ||
        regex.test(job.job_country) ||
        regex.test(job.employment_type)
    );

    dispatch({
      type: "SEARCH",
      payload: jobs,
    });
  };
  // **************************** CURRENTLY SEARCHING THE API ***************************************

  return (
    <JobsUserContext.Provider
      value={{
        jobs: state.jobs,
        user: state.user,
        signin,
        signout,
        setJobs,
        filterJobs,
        searchJobs,
        populateJobs,
      }}
      {...props}
    />
  );
};

// export the context and the context provider
// JobsUserContext will give central access to context values and methods
// JobsUserProvider will be wrapped around components to make state available globally
export { JobsUserContext, JobsUserProvider };
