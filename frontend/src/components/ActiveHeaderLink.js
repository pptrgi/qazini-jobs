import { NavLink } from "react-router-dom";

const ActiveHeaderLink = ({ where, styles = "", headerName }) => {
  return (
    <NavLink
      to={where}
      className={({ isActive }) =>
        isActive ? `${styles} text-tintColor4` : `${styles}`
      }
    >
      {headerName}
    </NavLink>
  );
};

export default ActiveHeaderLink;
