import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access of children pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);

  useEffect(() => {
    const checkTokenValidity = () => {
      const signinTime = localStorage.getItem("signinTime");
      const timeRightNow = new Date().getTime();

      const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours
      console.log("tokenActiveTime", tokenActiveTime);

      const validToken =
        timeRightNow - parseInt(signinTime, 10) < tokenActiveTime;

      if (!validToken) {
        context.signout(); // remove token from storage and null user object
      }
    };

    checkTokenValidity();
  }, [context, navigate]);

  return context.user
    ? children
    : toast.info("Make sure you are signed in") && (
        <Navigate to={"/signin"} replace={true} />
      );
};

export default ProtectedRoute;
