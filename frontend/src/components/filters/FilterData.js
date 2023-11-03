export const filtersData = {
  employment_type: {
    name: "employment type",
    data: [
      { shownName: "full-time", value: "FULLTIME" },
      { shownName: "part-time", value: "PARTTIME" },
      { shownName: "contractor", value: "CONTRACTOR" },
      { shownName: "internship", value: "INTERN" },
    ],
  },
  job_country: {
    name: "location",
    data: [
      { shownName: "USA", value: "US" },
      { shownName: "Kenya", value: "ke" },
    ],
  },
  company_type: {
    name: "company type",
    data: [
      { shownName: "Information", value: "Information" },
      { shownName: "Manufacturing", value: "Manufacturing" },
      { shownName: "Consulting", value: "Consulting" },
    ],
  },
  date_posted: {
    name: "date posted",
    data: [
      { shownName: "today", value: new Date().getTime() },
      { shownName: "week", value: new Date().getTime() },
      { shownName: "month", value: new Date().getTime() },
    ],
  },
};
