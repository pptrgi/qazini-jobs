import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

import { SIGNIN_USER_MUTATION } from "../graphql/mutations";
import { JobsUserContext } from "../context/jobsUserContext";

const Signin = () => {
  const context = useContext(JobsUserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signinValues, setSigninValues] = useState({
    email: "",
    password: "",
  });

  // handle form input changes
  const handleOnChange = (event) => {
    setSigninValues({
      ...signinValues,
      [event.target.name]: event.target.value,
    });
  };

  // reset input values and navigate to signin page on successful register
  // assign values object to variables
  // error
  const [signin_user_now, { loading }] = useMutation(SIGNIN_USER_MUTATION, {
    variables: signinValues,
    update(cache, { data: { signin_user: user_details } }) {
      // console.log("signin_user", user_details);
      context.signin(user_details);

      setSigninValues({ ...signinValues, email: "", password: "" });
      navigate("/");
    },
    onError({ graphQLErrors, networkError }) {
      console.log(graphQLErrors);
    },
  });

  // start the signin mutation operation on form submit
  const handleUserSignin = (event) => {
    event.preventDefault();

    signin_user_now();
  };

  return (
    <section className="custom_container">
      <div className="flex_center w-full min-h-screen">
        <div className="flex_col gap-[0.25rem]">
          <div className="auth_card">
            <div className="flex_col gap-[3rem]">
              <div className="flex_col items-center gap-[0.5rem]">
                <h2 className="title_h2">Qazini</h2>
                <h3 className="text-textColor text-h3 font-nunitoTitle">
                  Welcome Back
                </h3>
              </div>
              <form
                onSubmit={handleUserSignin}
                className="flex_col gap-[1.5rem]"
              >
                <div className=" flex_col gap-[0.75rem]">
                  <input
                    type="email"
                    name="email"
                    value={signinValues.email}
                    onChange={handleOnChange}
                    className="form_input bg-bodyColor"
                    placeholder="email address"
                  />

                  <div className="flex_between form_input bg-bodyColor items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signinValues.password}
                      onChange={handleOnChange}
                      placeholder="password"
                      className="w-full bg-transparent"
                    />
                    {showPassword ? (
                      <span
                        onClick={(e) => setShowPassword(false)}
                        className="text-ctaColor pl-[0.75rem]"
                      >
                        <IoEyeOffSharp />
                      </span>
                    ) : (
                      <span
                        onClick={(e) => setShowPassword(true)}
                        className="text-ctaColor pl-[0.75rem]"
                      >
                        <IoEyeSharp />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end items-end">
                  <div className="flex gap-[0.75rem] items-center">
                    <Link to={"/"} className="outline_button">
                      Cancel
                    </Link>
                    <button type="submit" className="cta_button">
                      {loading ? "lesdoit..." : "Let's go"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="flex justify-start items-start gap-[0.5rem]">
                <p>New to Qazini?</p>
                <Link to={"/register"} className="text-ctaColor">
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="flex_center w-full">
            <p className="text-smaller md800:text-small">
              Copyright &#169; 2023. Lifen Creatives
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
