import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access of children pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);

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

  useEffect(() => {
    if (!context.user) {
      navigate("/signin");
      toast.info("Make sure you are signed in");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
