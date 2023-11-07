import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";

import UserInformation from "../components/board/UserInformation";
import SavedJobs from "../components/board/SavedJobs";
import ProfileSkeleton from "../components/board/ProfileSkeleton";
import { GET_USER_QUERY } from "../graphql/queries";
import { JobsUserContext } from "../context/jobsUserContext";

const Board = () => {
  const context = useContext(JobsUserContext);
  const user = context.user;

  // fetch the user
  const { loading, data } = useQuery(GET_USER_QUERY, {
    variables: { user_id: user?.user_id },
    onError({ graphQLErrors, networkError }) {
      console.log(graphQLErrors);
    },
  });

  console.log(data);
  console.log(data?.get_user?.jobs);

  return (
    <div className="bg-bodyColor">
      <div className="custom_container section_after_header">
        <div className="flex_center w-full">
          <div className="w-[95%] xm360:w-[99%] md800:w-[80%]">
            <div className="flex_col gap-[1.25rem]">
              {/* <ProfileSkeleton /> */}
              <section className="bg-tintColor3 rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]">
                <UserInformation user={user} loading={loading} />
              </section>
              <section className="bg-bodyColor rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]">
                <SavedJobs jobs={data?.get_user?.jobs} />
              </section>
              {/* {/* <section className="bg-[#f4f5f7] rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]">
              </section> *
              <section className="bg-[#f4f5f7] rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]">
              </section>
              <section className="bg-tintColor4 rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]">
              </section>
              <section className="bg-tintColor2 rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"></section>
              <section className="bg-tintColor rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"></section>
              <section className="bg-tintColor3 rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"></section>
              <section className="bg-darkColor rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"></section>
              <section className="bg-halfDarkColor rounded-md px-[1rem] py-[2rem] shadow-lg xm360:px-[0.75rem]"></section> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
