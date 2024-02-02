import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { IoPencil, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

import { GET_USER_QUERY } from "../../graphql/queries";
import { JobsUserContext } from "../../context/jobsUserContext";
import { UPDATE_PROFILE_MUTATION } from "../../graphql/mutations";
import ProfileSkeleton from "./ProfileSkeleton";
import { toastGraphqlError } from "../../utils/toastGraphqlError";
import { noInternetHandler } from "../../utils/noInternet";
import LoadingDots from "../LoadingDots";

const UserInformation = ({ user, fetching }) => {
  const context = useContext(JobsUserContext);

  // input fields status
  const [enableEmailEdit, setEnableEmailEdit] = useState(false);
  const [enableNameEdit, setEnableNameEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // input fields
  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [fullname, setFullname] = useState(user?.fullname ? user.fullname : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // update user info mutation
  const [update_profile_now, { loading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      variables: { email, fullname, password },
      update(cache, { data }) {
        toast.success("Updated your profile");

        // on successful info update, also update the user's details in context, including the token
        context.signin(data?.update_profile);

        localStorage.setItem("userToken", data?.update_profile?.token);

        setPassword("");
        setConfirmPassword("");
      },
      onError({ graphQLErrors, networkError }) {
        if (graphQLErrors) {
          console.log("Update errors", graphQLErrors);
          toastGraphqlError(graphQLErrors);
        }

        if (networkError) {
          noInternetHandler();
        }
      },
    }
  );

  // start the update user info mutation operation on form submit only if the passwords matched
  const handleUpdateProfile = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      update_profile_now();
    }
  };

  return (
    <>
      {loading || fetching ? (
        <ProfileSkeleton />
      ) : (
        <div className="flex_col gap-[1.5rem]">
          <h3 className="title_h3">Manage Account</h3>
          <form onSubmit={handleUpdateProfile} className="flex_col gap-[2rem]">
            <div className="flex_col gap-[0.75rem]">
              <p className="title_name">Change Email | Name</p>
              <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
                <div
                  className={`flex_between w-full border_1_md ${
                    enableEmailEdit
                      ? "bg-bodyColor"
                      : "bg-halfDarkColor bg-opacity-30"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-[1rem] py-[0.6rem] bg-transparent"
                    disabled={enableEmailEdit ? false : true}
                    placeholder="jinalako@email.com"
                    id="emaild"
                  />
                  <span
                    onClick={(e) =>
                      setEnableEmailEdit((enableEmailEdit) => !enableEmailEdit)
                    }
                    className={`px-[0.5rem] text-h3 ${
                      enableEmailEdit ? "text-textColor" : "text-bodyColor"
                    } hover:text-h2 tran_200`}
                  >
                    <IoPencil />
                  </span>
                </div>
                <div
                  className={`flex_between w-full border_1_md ${
                    enableNameEdit
                      ? "bg-bodyColor"
                      : "bg-halfDarkColor bg-opacity-30"
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
                      setEnableNameEdit((enableNameEdit) => !enableNameEdit)
                    }
                    className={`px-[0.5rem] text-h3 ${
                      enableNameEdit ? "text-textColor" : "text-bodyColor"
                    } hover:text-h2 tran_200`}
                  >
                    <IoPencil />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex_col gap-[0.75rem]">
              <p className="title_name">Change Password</p>
              <div className="grid grid-cols-1 w-full gap-[0.5rem] md800:grid-cols-2 md800:gap-[2rem]">
                <div className="flex_between form_input bg-bodyColor items-center">
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
                      className="text-ctaColor pl-[0.75rem] hover:text-darkColor trans_200"
                    >
                      <IoEyeOffSharp />
                    </span>
                  ) : (
                    <span
                      onClick={(e) => setShowPassword(true)}
                      className="text-ctaColor pl-[0.75rem] hover:text-darkColor trans_200"
                    >
                      <IoEyeSharp />
                    </span>
                  )}
                </div>
                <div className="flex_between form_input bg-bodyColor items-center">
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
                      className="text-ctaColor pl-[0.75rem] hover:text-darkColor trans_200"
                    >
                      <IoEyeOffSharp />
                    </span>
                  ) : (
                    <span
                      onClick={(e) => setShowPassword(true)}
                      className="text-ctaColor pl-[0.75rem] hover:text-darkColor trans_200"
                    >
                      <IoEyeSharp />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-[1rem]">
              <Link to={"/"} className="outline_button">
                Cancel
              </Link>
              <button type="submit" className="cta_button">
                {loading ? <LoadingDots /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserInformation;
