import { useRef } from "react";
import { IoBookmark, IoClose } from "react-icons/io5";

import ActiveHeaderLink from "./ActiveHeaderLink";
import useClickOutsideClose from "../hooks/useClickOutsideClose";

const HamMenu = ({ closeMenu }) => {
  const hamRef = useRef();

  // close the ham menu on outside click
  useClickOutsideClose(hamRef, closeMenu);

  return (
    <div
      ref={hamRef}
      className="relative flex_center w-[75%] h-screen bg-bodyColor md480:w-[60%]"
    >
      <div className="flex_col gap-[1.75rem]">
        <div className="flex_col gap-[1rem] items-center">
          <span onClick={(e) => closeMenu()}>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="flex_col gap-[1rem] items-center">
          <div className="flex_center gap-[0.25rem]">
            <span>
              <IoBookmark />
            </span>
            <span>Saved Jobs</span>
          </div>
          <span className="cta_button">Sign Up</span>
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
    </div>
  );
};

export default HamMenu;
