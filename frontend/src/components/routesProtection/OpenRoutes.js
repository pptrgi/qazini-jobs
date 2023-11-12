import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const OpenRoute = ({ children }) => {
  // if there's a token already, prevent access of signin and register pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);
  console.log("Token Exp", context.user);

  const existingTokenExpiry = context.user?.exp;

  const storedToken = localStorage.getItem("userToken");
  console.log("storedToken", storedToken);

  const todaysDate = new Date();
  console.log("todaysDate", todaysDate);
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken = existingTokenExpiry - todaysDate > tokenActiveTime;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();
  }

  // return storedToken === null
  //   ? children
  //   : navigate("/") && toast.info("Already signed in / registered");
};

export default OpenRoute;
