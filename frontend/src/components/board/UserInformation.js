import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IoPencil, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

import { GET_USER_QUERY } from "../../graphql/queries";
import { JobsUserContext } from "../../context/jobsUserContext";
import { UPDATE_PROFILE_MUTATION } from "../../graphql/mutations";

const UserInformation = ({ user }) => {
  const context = useContext(JobsUserContext);
  // const user = context.user;

  const [enableEmailEdit, setEnableEmailEdit] = useState(false);
  const [enableNameEdit, setEnableNameEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //input fields
  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [fullname, setFullname] = useState(user?.fullname ? user.fullname : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [update_profile_now, { loading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      variables: { email, fullname, password },
      update(cache, { data }) {
        console.log("update data", data);
        const { get_user } = cache.readQuery({ query: GET_USER_QUERY });

        cache.writeQuery({
          query: GET_USER_QUERY,
          data: {
            get_user: data.update_profile,
          },
        });

        localStorage.setItem("userToken", data.update_profile.token);

        setPassword("");
      },
      onError({ graphQLErrors }) {
        console.log("Update errors", graphQLErrors);
      },
    }
  );

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    update_profile_now();
  };
  // if (loading) return <span>loading...</span>;
  // if (error) return console.log(error);
  // if (updateLoading) return <span>loading...</span>;
  // if (updateError) return console.log(error);

  return (
    <div className="flex_col gap-[1.5rem]">
      <h3 className="title_h3">Manage Account</h3>
      <form onSubmit={handleUpdateProfile} className="flex_col gap-[2rem]">
        <div className="flex_col gap-[0.75rem]">
          <p className="title_name">Change Email | Name</p>
          <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
            <div
              className={`flex_between w-full border_1_md ${
                enableEmailEdit ? "bg-bodyColor" : "bg-gray-400 bg-opacity-50"
              }`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-[1rem] py-[0.6rem] bg-transparent"
                disabled={enableEmailEdit ? false : true}
                placeholder="jinalako@email.com"
              />
              <span
                onClick={(e) =>
                  setEnableEmailEdit(enableEmailEdit ? false : true)
                }
                className={`px-[0.5rem] text-h3 ${
                  enableEmailEdit ? "text-textColor" : "text-bodyColor"
                }`}
              >
                <IoPencil />
              </span>
            </div>
            <div
              className={`flex_between w-full border_1_md ${
                enableNameEdit ? "bg-bodyColor" : "bg-gray-400 bg-opacity-50"
              }`}
            >
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-[1rem] py-[0.6rem] bg-transparent capitalize"
                disabled={enableNameEdit ? false : true}
                placeholder="Peter Smith"
              />
              <span
                onClick={(e) =>
                  setEnableNameEdit(enableNameEdit ? false : true)
                }
                className={`px-[0.5rem] text-h3 ${
                  enableNameEdit ? "text-textColor" : "text-bodyColor"
                }`}
              >
                <IoPencil />
              </span>
            </div>
          </div>
        </div>

        <div className="flex_col gap-[0.75rem]">
          <p className="title_name">Change Password</p>
          <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
            <div className="flex_between form_input items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="bg-transparent w-full"
              />
              {showPassword ? (
                <span
                  onClick={(e) => setShowPassword(false)}
                  className="text-ctaColor pl-[0.75rem]"
                >
                  <IoEyeSharp />
                </span>
              ) : (
                <span
                  onClick={(e) => setShowPassword(true)}
                  className="text-ctaColor pl-[0.75rem]"
                >
                  <IoEyeOffSharp />
                </span>
              )}
            </div>
            <div className="flex_between form_input items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                className="bg-transparent w-full"
              />
              {showPassword ? (
                <span
                  onClick={(e) => setShowPassword(false)}
                  className="text-ctaColor pl-[0.75rem]"
                >
                  <IoEyeSharp />
                </span>
              ) : (
                <span
                  onClick={(e) => setShowPassword(true)}
                  className="text-ctaColor pl-[0.75rem]"
                >
                  <IoEyeOffSharp />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <span className="outline_button">Cancel</span>
          <button type="submit" className="cta_button">
            {loading ? "updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
