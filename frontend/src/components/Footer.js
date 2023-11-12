import { IoHeart } from "react-icons/io5";
import { motion } from "framer-motion";

import { footerVariants } from "../transitions/transitions";

const Footer = () => {
  return (
    <motion.div
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-tintColor mt-[3rem] pt-[2rem] pb-[1rem] md480:pt-[2rem] lg1120:pt-[3.5rem]"
    >
      <div className="custom_container">
        <div className="flex_col gap-[1rem]">
          <div className="grid grid-cols-1 gap-[1.5rem] pb-[1.5rem] border-b-[1.8px] border-lightGrayColor md480:gap-[1rem] md480:items-center md480:grid-cols-12">
            <div className="col-span-1 md480:col-span-7 md800:col-span-7 lg1023:col-span-8 lg1120:col-span-9">
              <div className="flex_start_center">
                <div className="flex_col gap-[0.5rem]">
                  <h2 className="title_h2">Qazini</h2>
                  <div className="flex gap-[0.35rem] items-center">
                    <p>Built with</p>
                    <span className="text-ctaColor text-h3">
                      <IoHeart />
                    </span>
                    <p>
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
              <div className="flex w-full justify-between gap-[1rem]">
                <div className="flex_col gap-[0.5rem]">
                  <h4 className="uppercase text-darkColor truncate text-smaller font-semibolden md480:text-small">
                    quick links
                  </h4>
                  <div className="flex_col gap-[0.125rem]">
                    <span className="">Home</span>
                    <span className="">About</span>
                    <span className="">Contact</span>
                    <span className="">Account</span>
                    <span className="">Privacy</span>
                  </div>
                </div>
                <div className="flex_col gap-[0.5rem]">
                  <h4 className="uppercase text-darkColor truncate text-smaller font-semibolden md480:text-small">
                    social links
                  </h4>
                  <div className="flex_col gap-[0.125rem]">
                    <span className="">LinkedIn</span>
                    <span className="">X</span>
                    <span className="">Whatsapp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex_center w-full">
            <div className="flex items-center gap-[0.3rem] pt-[1rem] pb-[1rem]">
              <p>Feeling generous today?</p>
              <span>
                <img
                  src="/buymeacoffee_official_logo.png"
                  className="h-[20px]"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
