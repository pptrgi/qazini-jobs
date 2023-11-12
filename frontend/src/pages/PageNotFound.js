import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { pageVariants } from "../transitions/transitions";

const PageNotFound = () => {
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container section_after_header"
    >
      <div className="flex_center w-full h-[50vh]">
        <div className="flex_col gap-[1.75rem]">
          <div className="flex_col gap-[0.25rem]">
            <h2 className="text-large font-nunitoTitle font-semibolden tracking-wide text-darkColor leading-none">
              uh-oh
            </h2>
            <p className="tracking-wide">
              404 - Not the page you were looking for
            </p>
          </div>
          <Link to={"/"} className="cta_button w-fit">
            Go Back Home
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default PageNotFound;
