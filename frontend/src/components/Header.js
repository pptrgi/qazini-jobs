import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

import ActiveHeaderLink from "./ActiveHeaderLink";
import HamMenu from "./HamMenu";

const Header = () => {
  const [showHamMenu, setShowHamMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-[100%] bg-bodyColor flex z-50 h-[3.75rem]">
      <nav className="custom_container flex_between w-full">
        <h3 className="title_h3">Qazini</h3>
        <div className="hidden_flex_between w-8/12 md800:flex lg1023:w-1/2">
          <div className="flex gap-[2rem]">
            <ActiveHeaderLink where={"/"} headerName={"Home"} />
            <ActiveHeaderLink where={"/about"} headerName={"About"} />
            <ActiveHeaderLink where={"/contact"} headerName={"Contact"} />
          </div>
          <div className="flex gap-[2rem] items-center md800:gap-[1.5rem] lg1023:gap-[2rem]">
            <ActiveHeaderLink where={"/board"} headerName={"Saved Jobs"} />
            <Link to={"/register"} className="cta_button">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="inline-flex md800:hidden">
          <span onClick={(e) => setShowHamMenu(true)} className="text-h3">
            <CgMenuRightAlt />
          </span>
          {showHamMenu && (
            <div className="fixed right-0 top-0 bottom-0 w-full bg-lightGrayColor bg-opacity-60">
              <HamMenu closeMenu={() => setShowHamMenu(false)} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
