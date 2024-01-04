import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const OpenRoute = ({ children }) => {
  // if there's a token already, prevent access of signin and register pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);
  console.log("User", context.user);

  const getSigninTime = () => {
    return localStorage.getItem("signinTime");
  };
  const signinTime = getSigninTime();

  const timeRightNow = new Date().getTime();
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken = timeRightNow - parseInt(signinTime, 10) < tokenActiveTime;
  if (!validToken) {
    context.signout(); // removes token from storage and null user object
  }

  if (!context.user) {
    return children;
  } else {
    return (
      toast.info("Signout first to access this page") && (
        <Navigate to="/" replace={true} />
      )
    );
  }
};

export default OpenRoute;
