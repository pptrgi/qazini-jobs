import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { motion } from "framer-motion";

import ActiveHeaderLink from "./ActiveHeaderLink";
import HamMenu from "./HamMenu";
import { JobsUserContext } from "../context/jobsUserContext";
import { headerVariants } from "../transitions/transitions";

const Header = () => {
  const [showHamMenu, setShowHamMenu] = useState(false);
  const { user, signout } = useContext(JobsUserContext);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-[100%] bg-bodyColor flex z-50 h-[3.75rem] bottom_shadow"
    >
      <nav className="custom_container flex_between w-full">
        <Link to={"/"}>
          <h3 className="title_h3">Qazini</h3>
        </Link>
        <div className="hidden_flex_between w-8/12 md800:flex lg1023:w-1/2">
          <div className="flex gap-[2rem]">
            <ActiveHeaderLink where={"/"} headerName={"Home"} />
            <ActiveHeaderLink where={"/about"} headerName={"About"} />
            <ActiveHeaderLink where={"/contact"} headerName={"Contact"} />
          </div>
          <div className="flex gap-[1.5rem] items-center lg1023:gap-[2rem]">
            <ActiveHeaderLink where={"/board"} headerName={"Saved Jobs"} />

            {/* when user is signed in show signout, otherwise sign up button */}
            {user?.fullname ? (
              <span onClick={(e) => signout()} className="flex gap-1">
                <span className="capitalize font-semibolden">{`${
                  user?.fullname?.split(" ")[0]
                },`}</span>
                <span className="text-red-400 cursor-pointer hover:text-red-500 trans_200">
                  signout?
                </span>
              </span>
            ) : (
              <Link to={"/register"} className="cta_button">
                Sign Up
              </Link>
            )}
          </div>
        </div>
        <div className="inline-flex md800:hidden">
          <span onClick={(e) => setShowHamMenu(true)} className="text-h3">
            <CgMenuRightAlt />
          </span>
          {showHamMenu && (
            <div className="fixed right-0 top-0 bottom-0 w-full bg-lightGrayColor bg-opacity-60">
              <HamMenu
                closeMenu={() => setShowHamMenu(false)}
                user={user}
                signout={signout}
              />
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
