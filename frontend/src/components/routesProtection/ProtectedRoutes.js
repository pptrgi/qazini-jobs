import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import { JobsUserContext } from "../../context/jobsUserContext";

const ProtectedRoute = ({ children }) => {
  // if there's NO token, prevent access of children pages

  const navigate = useNavigate();
  const { user, signout } = useContext(JobsUserContext);

  // decode user detail from the token
  const decodedUserDetails = user?.token && jwtDecode(user.token);
  const existingTokenIssue = decodedUserDetails?.iat;
  const existingTokenExpiry = decodedUserDetails?.exp;

  const validToken =
    parseInt(existingTokenExpiry) > parseInt(existingTokenIssue);

  if (!validToken) {
    localStorage.removeItem("userToken");
    signout();

    navigate("/signin");
    return toast.info("Make sure you are signed in");
  } else {
    return children;
  }
};

export default ProtectedRoute;
