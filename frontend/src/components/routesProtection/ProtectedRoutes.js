import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";
import { replace } from "formik";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access children pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);
  console.log("Token Exp", context.user);

  const existingTokenExpiry = context.user?.exp;

  const storedToken = localStorage.getItem("userToken");
  console.log("storedToken", storedToken);

  const todaysDateNow = new Date();
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken = parseInt(existingTokenExpiry) - todaysDateNow > 1;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();
  }

  return storedToken !== null
    ? children
    : toast.info("Sign in to access this service") && (
        <Navigate to={"/signin"} replace={true} />
      );
};

export default ProtectedRoute;
