import { IoHeart } from "react-icons/io5";
import { motion } from "framer-motion";

import { footerVariants } from "../transitions/transitions";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.div
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-tintColor mt-[3rem] pt-[2rem] pb-[1rem] shadow md480:pt-[2rem] lg1120:pt-[3.5rem]"
    >
      <div className="custom_container">
        <div className="flex_col gap-[1rem]">
          <div className="grid grid-cols-1 gap-[1.5rem] pb-[1.5rem] border-b-[1.8px] border-lightGrayColor md480:gap-[1rem] md480:items-center md480:grid-cols-12">
            <div className="col-span-1 md480:col-span-7 md800:col-span-7 lg1023:col-span-8 lg1120:col-span-9">
              <div className="flex_start_center">
                <div className="flex_col gap-[0.5rem]">
                  <h2 className="title_h2">Qazini</h2>
                  <div className="flex gap-[0.35rem] items-center">
                    <p className="text-textColor/50">Built with</p>
                    <span className="text-ctaColor text-h3">
                      <IoHeart />
                    </span>
                    <p className="text-textColor/50">
                      by{" "}
                      <span className="font-semibolden text-darkColor">
                        Lifen Creatives
                      </span>{" "}
                      &#169; 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 md480:col-span-5 md800:col-span-5 lg1023:col-span-4 lg1120:col-span-3">
              <div className="flex w-full gap-[1rem] justify-between md480:justify-end md480:gap-[3rem] md800:gap-[4.25rem] lg1023:gap-[5rem] lg1120:gap-[5.5rem]">
                <div className="flex_col gap-[0.5rem]">
                  <h4 className="uppercase text-darkColor truncate text-smaller font-semibolden md480:text-small">
                    quick links
                  </h4>
                  <div className="flex_col gap-[0.125rem]">
                    <Link to={"/"} className="text-textColor/50">
                      Home
                    </Link>
                    <Link to={"/about"} className="text-textColor/50">
                      About
                    </Link>
                    <Link to={"/contact"} className="text-textColor/50">
                      Contact
                    </Link>
                    <Link to={"/board"} className="text-textColor/50">
                      Account
                    </Link>
                    <a
                      href="https://nyumbahub.vercel.app/privacy"
                      className="text-textColor/50"
                    >
                      Privacy
                    </a>
                  </div>
                </div>
                <div className="flex_col gap-[0.5rem]">
                  <h4 className="uppercase text-darkColor truncate text-smaller font-semibolden md480:text-small">
                    social links
                  </h4>
                  <div className="flex_col gap-[0.125rem]">
                    <a
                      href="https://www.linkedin.com/in/petergitonga"
                      className="text-textColor/50"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/ptrgitonga"
                      className="text-textColor/50"
                    >
                      X
                    </a>
                    <a
                      href="https://wa.me/254700119134"
                      className="text-textColor/50"
                    >
                      Whatsapp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex_center w-full">
            <div className="flex items-center gap-[0.3rem] pt-[1rem] pb-[1rem]">
              <p className="text-textColor/50">Feeling generous today?</p>
              <a href="https://buymeacoffee.com/ptrgitonga">
                <img
                  src="/buymeacoffee_official_logo.png"
                  className="h-[20px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
