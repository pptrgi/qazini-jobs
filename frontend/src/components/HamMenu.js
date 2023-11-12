import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoBookmark, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

import { hamMenuSlideVariants } from "../transitions/transitions";
import ActiveHeaderLink from "./ActiveHeaderLink";
import useClickOutsideClose from "../hooks/useClickOutsideClose";

const HamMenu = ({ closeMenu, user, signout }) => {
  const hamRef = useRef();

  // close the ham menu on outside click
  useClickOutsideClose(hamRef, closeMenu);

  return (
    <motion.div
      ref={hamRef}
      variants={hamMenuSlideVariants}
      className="relative flex_center w-[75%] h-screen bg-bodyColor md480:w-[60%]"
    >
      <div className="flex_col gap-[1.75rem]">
        <div className="flex_col gap-[1rem] items-center">
          <ActiveHeaderLink
            where={"/"}
            headerName={"Home"}
            mobileMenuCloser={closeMenu}
          />
          <ActiveHeaderLink
            where={"/about"}
            headerName={"About"}
            mobileMenuCloser={closeMenu}
          />
          <ActiveHeaderLink
            where={"/contact"}
            headerName={"Contact"}
            mobileMenuCloser={closeMenu}
          />
        </div>

        <div className="flex_col gap-[1rem] items-center">
          <NavLink
            to={"/board"}
            className={({ isActive }) =>
              isActive
                ? "flex_center gap-[0.25rem] text-tintClearColor"
                : "flex_center gap-[0.25rem]"
            }
            onClick={(e) => closeMenu()}
          >
            <span>
              <IoBookmark />
            </span>
            <span>Saved Jobs</span>
          </NavLink>

          {/* when user is signed in show signout, otherwise sign up button */}
          {user?.fullname ? (
            <span onClick={(e) => signout()} className="flex gap-1">
              <span className="capitalize font-semibolden">{`Hi ${
                user?.fullname?.split(" ")[0]
              },`}</span>
              <span className="text-red-400 cursor-pointer">signout?</span>
            </span>
          ) : (
            <Link
              to={"/register"}
              className="cta_button"
              onClick={(e) => closeMenu()}
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <span
        onClick={(e) => closeMenu()}
        className="absolute top-[2rem] right-[1.5rem] text-normal"
      >
        <IoClose />
      </span>
      <div className="absolute bottom-[1.25rem] flex_center w-full">
        <p className="text-tiny">Copyright &#169; 2023. Lifen Creatives</p>
      </div>
    </motion.div>
  );
};

export default HamMenu;
