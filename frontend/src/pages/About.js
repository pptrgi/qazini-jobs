import { RiDoubleQuotesL } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  pageVariants,
  pageTitleFadeOutVariants,
  fadeOutVariants,
} from "../transitions/transitions";

const About = () => {
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container section_after_header"
    >
      <div className="flex_center w-full">
        <div className="w-[95%] md480:w-[90%] md800:w-[80%]">
          <div className="flex_col gap-[2rem] w-full items-center">
            <motion.div
              variants={pageTitleFadeOutVariants}
              className="relative h-[10rem] bg-tintColor2 w-full rounded-sm overflow-hidden md480:h-[13rem]"
            >
              <div className="flex_center w-full h-full">
                <div className="flex_col gap-[0.5rem] items-center">
                  <h2 className="title_h2 leading-none">About Us</h2>
                  <p className="px-[0.5rem] text-center z-10">
                    Qazini is not just a job search site, we're the answer
                  </p>
                </div>
              </div>
              <span className="absolute -bottom-[70px] -right-[90px] w-[130px] h-[150px] rounded-full bg-tintClearColor md480:w-[150px] md480:-right-[80px] md480:-bottom-[20px]"></span>
            </motion.div>

            <motion.div variants={fadeOutVariants} className="max-w-2xl">
              <div className="flex_col gap-[2.5rem]">
                <div className="flex_col gap-[1.75rem]">
                  <div className="relative">
                    <span className="absolute top-0 bottom-0 w-[3px] bg-ctaColor rounded-sm"></span>
                    <p className="pl-[0.5rem] md480:pl-[0.75rem]">
                      Qazini takes the job you've been looking for, wraps it and
                      gifts it to you. You deserve it.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute top-0 bottom-0 w-[3px] bg-ctaColor rounded-sm"></span>
                    <p className="pl-[0.5rem] md480:pl-[0.75rem]">
                      While job vacancies exist, we are committed to do whatever
                      we can to help easen the job search (a job by itself) for
                      the folks we believe in. Including you.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute top-0 bottom-0 w-[3px] bg-ctaColor rounded-sm"></span>
                    <div className="flex_col gap-[0.5rem] pl-[0.5rem] md480:pl-[0.75rem]">
                      <p>
                        That means a ton of latest opportunities from a dozen
                        industries within a location or two or more, or
                        globally.
                      </p>
                      <p>
                        But we have a problem - uh-oh. As you may have noticed,
                        we are limited on the number of opportunities we supply
                        (max of 10), why? We are depending on another job
                        provider's service for our posts, which is very generous
                        of{" "}
                        <a
                          href="https://rapidapi.com"
                          className="text-ctaColor font-semibolden"
                        >
                          JSearch
                        </a>{" "}
                        nevertheless.
                      </p>
                      <p>
                        If you'd like to see us increase our posts you can
                        support us to get the JSearch's premium plan by{" "}
                        <a
                          href="https://buymeacoffee.com/ptrgitonga"
                          className="text-ctaColor font-semibolden"
                        >
                          buying us a coffee
                        </a>{" "}
                        or in any other means, and we'll greatly appreciate it.
                        Or undirectly, support JSearch so maybe in future
                        they'll increase their freemium limit, a big maybe.
                      </p>
                      <p>
                        We also welcome employers to advertise their jobs in our
                        platform. Again, problem solved.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex_center w-full">
                  {/* Add the founder's quote - haha (-_^) */}
                  <div className="bg-tintColor border-[2px] border-skeletonColor/25 rounded-md px-[0.75rem] pt-[1.5rem] pb-[1rem] max-w-lg">
                    <figure className="flex_col gap-[0.5rem] items-center">
                      <blockquote className="flex gap-2">
                        <span className="text-h2">
                          <RiDoubleQuotesL />
                        </span>
                        <p className="tracking-wide">
                          An additional job in here is an additional chance for
                          someone out there.
                        </p>
                      </blockquote>
                      <figcaption className="flex_end w-full">
                        <cite className="uppercase italic text-tiny text-textColor/80 md480:text-smaller">
                          ~ qazini founder - peter
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="flex_col gap-[0.5rem]">
                  <p className="text-normal max-w-[230px] text-darkColor md480:text-h3">
                    Now, y'all ready for some opportunities?
                  </p>
                  <div className="flex_col gap-[0.25rem] md480:flex-row md480:gap-[0.4rem]">
                    <p>We get it, you're here to seize the opportunities.</p>
                    <Link to={"/"} className="text-ctaColor font-semibolden">
                      Right here
                    </Link>
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

export default About;
