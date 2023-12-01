import { NavLink } from "react-router-dom";

const ActiveHeaderLink = ({
  where,
  styles = "",
  headerName,
  mobileMenuCloser = () => {},
}) => {
  return (
    <NavLink
      to={where}
      className={({ isActive }) =>
        isActive
          ? `${styles} text-tintClearColor`
          : `${styles} hover:text-tintClearColor trans_200`
      }
      onClick={(e) => mobileMenuCloser()}
    >
      {headerName}
    </NavLink>
  );
};

export default ActiveHeaderLink;
