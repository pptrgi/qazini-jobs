import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-[100%] bg-bodyColor flex z-50 h-[3.5rem]">
      <nav className="custom_container flex_between w-full">
        <h3 className="title_h3">Qazini</h3>
        <div className="hidden_flex_between w-8/12 md800:flex lg1023:w-1/2">
          <div className="flex gap-[2rem]">
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <div className="flex gap-[2rem] items-center md800:gap-[1.5rem] lg1023:gap-[2rem]">
            <span>Saved Jobs</span>
            <span className="cta_button">Sign Up</span>
          </div>
        </div>
        <div className="inline-flex md800:hidden">
          <span className="text-h3">
            <IoMenu />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
