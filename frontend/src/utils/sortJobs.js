export const sortJobs = (jobsArray, sortValue) => {
  /*
    Accepts an unsorted array, and the sort option
    Returns a sorted array
    */

  switch (sortValue) {
    case "expiring soon":
      return jobsArray?.sort(
        (a, b) => new Date(b?.date_expiring) - new Date(a?.date_expiring)
      );

    case "newest first":
      return jobsArray?.sort(
        (a, b) => new Date(b?.date_posted) - new Date(a?.date_posted)
      );

    case "name (A - Z)":
      return jobsArray?.sort((a, b) =>
        a?.job_title.localeCompare(b?.job_title)
      );

    case "default":
      return jobsArray?.sort(
        (a, b) => new Date(b?.date_posted) - new Date(a?.date_posted)
      );

    default:
      return jobsArray;
  }
};
