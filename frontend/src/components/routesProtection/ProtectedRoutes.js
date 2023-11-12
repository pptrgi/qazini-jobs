import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { JobsUserContext } from "../../context/jobsUserContext";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access children pages

  const navigate = useNavigate();
  const context = useContext(JobsUserContext);
  console.log("Token Exp", context.user);

  const existingTokenExpiry = context.user?.exp;

  const storedToken = localStorage.getItem("userToken");
  console.log("storedToken", storedToken);

  const todaysDate = new Date();
  const tokenActiveTime = 12 * 60 * 60 * 1000; // 12 hours

  const validToken = existingTokenExpiry - todaysDate > tokenActiveTime;

  if (!validToken) {
    localStorage.removeItem("userToken");
    context.signout();
  }

  // return storedToken !== null
  //   ? children
  //   : navigate("/signin") && toast.info("Sign in to access this service");
};

export default ProtectedRoute;
