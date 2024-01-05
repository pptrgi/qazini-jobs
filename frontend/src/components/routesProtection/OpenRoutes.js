import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const OpenRoute = ({ children }) => {
  // if there's a token already, prevent access of signin and register pages
  const context = useContext(JobsUserContext);

  useEffect(() => {
    const checkTokenValidity = () => {
      const signinTime = localStorage.getItem("signinTime");
      const timeRightNow = new Date().getTime();

      const tokenActiveTime = 12 * 60 * 60 * 1000;

      const validToken =
        timeRightNow - parseInt(signinTime, 10) < tokenActiveTime;

      if (!validToken) {
        context.signout(); // remove token from storage and null user object
      }
    };

    checkTokenValidity();
  }, [context]);

  if (context.user) {
    return (
      toast.info("Signout first to access this page") && (
        <Navigate to="/" replace={true} />
      )
    );
  } else {
    return children;
  }
};

export default OpenRoute;
