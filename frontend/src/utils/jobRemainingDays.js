export const calculateRemainingDays = (job_expiry_date) => {
  let remainingDays;

  if (job_expiry_date !== null) {
    const days = Math.floor(
      (new Date(job_expiry_date) - new Date()) / 86400000
    );
    console.log(days);
    if (days > 0) {
      remainingDays = days;
    }
  }

  return remainingDays;
};
