import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access of children pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);
  console.log("Token Exp", context.user);

  const existingTokenExpiry = context.user?.exp;

  const storedToken = localStorage.getItem("userToken");
  console.log("storedToken", storedToken);

  const timeRightNow = new Date().getTime();
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken =
    timeRightNow - parseInt(existingTokenExpiry) < tokenActiveTime;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();

    toast.info("Make sure you are signed in");
    return navigate("/signin");
  } else {
    return children;
  }
};

export default ProtectedRoute;
