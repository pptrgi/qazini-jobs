import { Navigate } from "react-router-dom";

export const noInternetHandler = () => {
  return <Navigate to={"/no-internet"} replace={true} />;
};
