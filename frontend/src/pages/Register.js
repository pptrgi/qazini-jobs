import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

import { GET_USER_QUERY } from "../graphql/queries";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // handle text input fields changes
  const handleOnChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  // reset input values and navigate to signin page on successful register
  // assign values object to variables
  // error
  const [register_user_now, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(cache, { data }) {
      // const user = cache.readQuery({ query: GET_USER_QUERY });
      // console.log("user", user);
      console.log("data", data);

      setRegisterValues({
        ...registerValues,
        fullname: "",
        email: "",
        password: "",
      });
      navigate("/signin");
    },
    variables: registerValues,
    onError({ graphQLErrors, networkError }) {
      console.log(graphQLErrors);
    },
  });

  // start the mutation/register operation on submit
  const handleUserRegister = (event) => {
    event.preventDefault();

    register_user_now();
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
                  Welcome, Let's get started
                </h3>
              </div>
              <form
                onSubmit={handleUserRegister}
                className="flex_col gap-[1.5rem]"
              >
                <div className=" flex_col gap-[0.75rem]">
                  <input
                    type="text"
                    name="fullname"
                    value={registerValues.fullname}
                    onChange={handleOnChange}
                    className="form_input"
                    placeholder="full name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={registerValues.email}
                    onChange={handleOnChange}
                    className="form_input"
                    placeholder="email address"
                  />

                  <div className="flex_between form_input items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registerValues.password}
                      onChange={handleOnChange}
                      placeholder="password"
                    />
                    {showPassword ? (
                      <span
                        onClick={(e) => setShowPassword(false)}
                        className="text-ctaColor"
                      >
                        <IoEyeSharp />
                      </span>
                    ) : (
                      <span
                        onClick={(e) => setShowPassword(true)}
                        className="text-ctaColor"
                      >
                        <IoEyeOffSharp />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end items-end">
                  <div className="flex gap-[0.75rem] items-center">
                    <span className="outline_button">Cancel</span>
                    <button type="submit" className="cta_button">
                      {loading ? "registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex_col gap-[0.25rem]">
                <p className="text-smaller md800:text-small">
                  By registering, you agree to our{" "}
                  <span className="text-ctaColor">Terms of Service</span>
                </p>
                <div className="flex justify-end items-end gap-[0.5rem]">
                  <p>Already in Qazini?</p>
                  <span className="text-ctaColor">Let's go</span>
                </div>
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

export default Register;
