export const checkCompanyLogo = (logoURL) => {
  /*
    Checks if the company has a logo url, if it doesn't returns a false
    else verifies if the url points to an image file format with a regex pattern
    */
  if (!logoURL) {
    return false;
  } else {
    const verifyPattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp|svg)$",
      "i"
    );
    return verifyPattern.test(logoURL);
  }
};
