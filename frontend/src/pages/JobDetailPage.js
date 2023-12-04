import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { fadeOutVariants, pageVariants } from "../transitions/transitions";
import TitlesSection from "../components/jobDetailPage/TitlesSection";
import Descriptions from "../components/jobDetailPage/Descriptions";

const JobDetailPage = () => {
  const {
    state: { job_details },
  } = useLocation();

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container section_after_header relative"
    >
      <div className="flex_center w-full">
        <div className="w-[95%] bg-bodyColor shadow-lg md480:w-[90%] md800:w-[80%]">
          <div className="">
            <div className="flex_col gap-[2.5rem]">
              <motion.section
                variants={fadeOutVariants}
                className="bg-tintColor2 px-[1.5rem] py-[2rem] xm:px-[0.75rem]"
              >
                <TitlesSection job={job_details} />
              </motion.section>

              <motion.section
                variants={fadeOutVariants}
                className="px-[1.5rem] pt-[2rem] pb-[1rem] xm360:px-[0.75rem]"
              >
                <Descriptions
                  description={job_details?.job_description}
                  responsibilities={job_details?.job_responsibilities}
                  qualifications={job_details?.job_qualifications}
                />
              </motion.section>

              <motion.div className="px-[1.5rem] pt-[1rem] pb-[2rem] xm360:px-[0.75rem]">
                <a href={`${job_details?.apply_link}`} className="cta_button">
                  Apply Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default JobDetailPage;
