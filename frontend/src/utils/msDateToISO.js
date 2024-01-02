export const convertMsDateToISO = (milliseconds) => {
  const dateInNumber = parseInt(milliseconds);

  return new Date(dateInNumber).toISOString();
};
