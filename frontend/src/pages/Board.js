import { useContext } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { motion } from "framer-motion";

import { fadeOutVariants, pageVariants } from "../transitions/transitions";
import UserInformation from "../components/board/UserInformation";
import SavedJobs from "../components/board/SavedJobs";
import { GET_USER_QUERY } from "../graphql/queries";
import { JobsUserContext } from "../context/jobsUserContext";
import { toastGraphqlError } from "../utils/toastGraphqlError";
import { noInternetHandler } from "../utils/noInternet";

const Board = () => {
  const client = useApolloClient();
  const context = useContext(JobsUserContext);

  // fetch the user
  const { loading, data } = useQuery(GET_USER_QUERY, {
    variables: { user_id: context.user?.user_id },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log("profile errors", graphQLErrors);
        toastGraphqlError(graphQLErrors);
      }

      if (networkError) {
        noInternetHandler();
      }
    },
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="bg-bodyColor"
    >
      <div className="custom_container section_after_header">
        <div className="flex_center w-full">
          <div className="w-[95%] xm360:w-[99%] md800:w-[80%]">
            <div className="flex_col gap-[1.25rem]">
              {/* <ProfileSkeleton /> */}
              <motion.section
                variants={fadeOutVariants}
                className="bg-tintColor3 rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"
              >
                <UserInformation user={context.user} fetching={loading} />
              </motion.section>

              {/* Jobs saved by user */}
              <motion.section
                variants={fadeOutVariants}
                className="bg-bodyColor rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"
              >
                <SavedJobs jobs={data?.get_user?.jobs} fetching={loading} />
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Board;
