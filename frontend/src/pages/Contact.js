import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiWhatsapp,
} from "react-icons/si";
import { PiGlobeFill } from "react-icons/pi";
import { motion } from "framer-motion";

import {
  pageVariants,
  slideGoingLeftVariants,
  slideGoingRightVariants,
  pageTitleFadeOutVariants,
} from "../transitions/transitions";

const Contact = () => {
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container section_after_header"
    >
      <div className="flex_center w-full">
        <div className="w-[95%] md480:w-[90%] md800:w-[80%]">
          <div className="flex_col gap-[3.5rem] w-full items-center md480:gap-[4rem]">
            <motion.div
              variants={pageTitleFadeOutVariants}
              className="h-[25vh] bg-tintColor2 w-full rounded-sm"
            >
              <div className="flex_center w-full h-full">
                <h2 className="title_h2 leading-none">Contact Us</h2>
              </div>
            </motion.div>

            <motion.div variants={slideGoingLeftVariants} className="w-full">
              <div className="grid grid-cols-1 gap-[0.75rem] items-center md480:grid-cols-6">
                <div className="flex_start_center w-full col-span-6 md480:col-span-2">
                  <div className="block md480:flex md480:items-center">
                    <div className="flex_col w-full gap-[0.25rem] md480:gap-[0.5rem]">
                      <h4 className="text-normal tracking-wider leading-none">
                        Start a
                      </h4>
                      <h3 className="text-h3 tracking-wider leading-none">
                        Conversation
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex_start_end w-full col-span-6 md480:col-span-4">
                  <form className="contact_form flex_col gap-[0.75rem]">
                    <input
                      type="text"
                      className="contact_form_input"
                      placeholder="fullname"
                    />
                    <input
                      type="email"
                      className="contact_form_input"
                      placeholder="example@email.com"
                    />
                    <input
                      type="text"
                      className="contact_form_input"
                      placeholder="message's subject"
                    />
                    <textarea
                      rows={5}
                      className="contact_form_input resize-none"
                      placeholder="message body"
                    />
                    <div className="flex_end w-full mt-[1.5rem]">
                      <button type="submit" className="cta_button capitalize">
                        send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideGoingRightVariants} className="w-full">
              <div className="grid grid-cols-1 items-center gap-[1rem] md480:grid-cols-4">
                <div className="flex gap-[1rem] col-span-4 md480:col-span-2">
                  <a
                    href="https://www.linkedin.com/in/petergitonga"
                    className="p-[0.25rem] rounded-full bg-tintClearColor text-bodyColor text-h3"
                  >
                    <SiLinkedin />
                  </a>
                  <a
                    href="https://wa.me/254700119134"
                    className="p-[0.25rem] rounded-full bg-tintClearColor text-bodyColor text-h3"
                  >
                    <SiWhatsapp />
                  </a>
                  <a
                    href="https://x.com/ptrgitonga"
                    className="p-[0.25rem] rounded-full bg-tintClearColor text-bodyColor text-h3"
                  >
                    <SiTwitter />
                  </a>
                  <a
                    href="https://www.facebook.com/petergitonga"
                    className="p-[0.25rem] rounded-full bg-tintClearColor text-bodyColor text-h3"
                  >
                    <SiFacebook />
                  </a>
                  <span className="hidden p-[0.25rem] rounded-full bg-tintClearColor  text-bodyColor text-h3 md480:block">
                    <SiInstagram />
                  </span>
                  <a
                    href="https://ptrgitonga.vercel.app"
                    className="p-[0.25rem] rounded-full bg-tintClearColor text-bodyColor text-h3"
                  >
                    <PiGlobeFill />
                  </a>

                  {/* <span className="text-h2 bg-tintClearColor text-bodyColor rounded-full">
                    <IoLogoTwitter />
                  </span> */}
                </div>
                <div className="col-span-4 md480:col-span-2">
                  <div className="flex_start_center w-full">
                    <div className="flex_col gap-[0.25rem] col-span-6 md480:col-span-2 md480:gap-[0.5rem]">
                      <h4 className="text-normal tracking-wider leading-none">
                        How about on
                      </h4>
                      <h3 className="text-h3 tracking-wider leading-none">
                        Socials?
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
