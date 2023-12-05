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

  const timeRightNow = new Date().getTime();
  console.log("timeRightNow", timeRightNow);
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken =
    timeRightNow - parseInt(existingTokenExpiry, 10) < tokenActiveTime;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();

    return children;
  } else {
    navigate("/");
    return toast.info("Signout first to access this page");
  }
};

export default OpenRoute;
