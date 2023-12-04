import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoHeart } from "react-icons/io5";
import {
  RiWhatsappFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiPhoneFill,
  RiFacebookFill,
} from "react-icons/ri";

import { footerVariants } from "../transitions/transitions";

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
          <div className="grid grid-cols-1 gap-[2.5rem] pb-[1.5rem] border-b-[1.8px] border-lightGrayColor md480:gap-[1rem] md480:items-center md480:grid-cols-12">
            <div className="col-span-1 md480:col-span-7 md800:col-span-7 lg1023:col-span-8 lg1120:col-span-9">
              <div className="flex_start_center">
                <div className="flex_col gap-[1.25rem]">
                  <div className="flex_col gap-[0.5rem]">
                    <h2 className="title_h2">Qazini</h2>
                    <div className="flex gap-[0.35rem] items-center">
                      <p className="text-textColor/60">Built with</p>
                      <span className="text-ctaColor text-h3">
                        <IoHeart />
                      </span>
                      <p className="text-textColor/60">
                        by{" "}
                        <a
                          href="https://pgitonga.vercel.app"
                          className="font-semibolden text-darkColor hover:text-darkColor/80 trans_200"
                        >
                          Lifen Creatives
                        </a>{" "}
                        &#169; 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[0.75rem] items-center md480:gap-[1rem]">
                    <a
                      href="https://www.linkedin.com/in/petergitonga"
                      className="footer_social_icon"
                    >
                      <RiLinkedinFill />
                    </a>
                    <a
                      href="https://wa.me/254700119134"
                      className="footer_social_icon"
                    >
                      <RiWhatsappFill />
                    </a>
                    <a
                      href="https://x.com/ptrgitonga"
                      className="footer_social_icon"
                    >
                      <RiTwitterXFill />
                    </a>
                    <a
                      href="https://www.facebook.com/petergitonga"
                      className="footer_social_icon"
                    >
                      <RiFacebookFill />
                    </a>
                    <a href="tel:254700119134" className="footer_social_icon">
                      <RiPhoneFill />
                    </a>
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
                    <Link to={"/"} className="footer_links">
                      Home
                    </Link>
                    <Link to={"/about"} className="footer_links">
                      About
                    </Link>
                    <Link to={"/contact"} className="footer_links">
                      Contact
                    </Link>
                    <Link to={"/board"} className="footer_links">
                      Profile
                    </Link>
                    <Link to={"/register"} className="footer_links">
                      Sign Up
                    </Link>
                  </div>
                </div>
                <div className="flex_col gap-[0.5rem]">
                  <h4 className="uppercase text-darkColor truncate text-smaller font-semibolden md480:text-small">
                    external links
                  </h4>
                  <div className="flex_col gap-[0.125rem]">
                    <a
                      href="https://pgitonga.vercel.app"
                      className="footer_links"
                    >
                      Owner
                    </a>
                    <a
                      href="https://nyumbahub.vercel.app/privacy-policy"
                      className="footer_links"
                    >
                      Privacy
                    </a>
                    <a
                      href="https://nyumbahub.vercel.app/terms-of-service"
                      className="footer_links"
                    >
                      T & C
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
