import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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

  const todaysDateNow = new Date().getTime();
  console.log("todaysDate", todaysDateNow);
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken = parseInt(existingTokenExpiry) - todaysDateNow > 1;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();
  }

  return storedToken === null
    ? children
    : toast.info("Already signed in / registered") &
      <Navigate to={"/"} replace={true} />;
};

export default OpenRoute;
