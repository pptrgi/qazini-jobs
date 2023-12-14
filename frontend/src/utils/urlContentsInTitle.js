import { formatDate } from "./dateFormatter";
import { calculateRemainingDays } from "./jobRemainingDays";

export const assignContentsToTitle = (job) => {
  return `${job?.job_title}\n\nAt ${job?.employer_name}\nPosted: ${formatDate(
    job.date_posted
  )}\n${
    job?.date_expiring
      ? `Deadline: ${formatDate(job.date_expiring)}`
      : "No Deadline"
  }\n${
    job?.date_expiring
      ? `Remaining: ${calculateRemainingDays(job.date_expiring)} days`
      : "Open Applications"
  }\nEmployment type: ${job?.employment_type}\nApply link: ${
    job?.apply_link
  }\n\nShared with love by Qazini's founder p.Gitonga. Follow us on X`;
};
