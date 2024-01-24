import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";

import { pageVariants, authFadeOutVariants } from "../transitions/transitions";
import { SIGNIN_USER_MUTATION } from "../graphql/mutations";
import { JobsUserContext } from "../context/jobsUserContext";
import { toastGraphqlError } from "../utils/toastGraphqlError";
import { noInternetHandler } from "../utils/noInternet";
import LoadingDots from "../components/LoadingDots";

// sign-in form inputs schema
const signinSchema = yup.object({
  email: yup
    .string()
    .email("Provide a valid email")
    .required("Provide your email address"),
  password: yup.string().required("Password field is required"),
});

const Signin = () => {
  const context = useContext(JobsUserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // validate schema and start the signin mutation operation on form submit
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: (values) => {
      signin_user_now({ variables: values });
    },
  });

  // user signin mutation
  const [signin_user_now, { loading }] = useMutation(SIGNIN_USER_MUTATION, {
    update(cache, { data: { signin_user: user_details } }) {
      context.signin(user_details);

      formik.resetForm();

      navigate("/");
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log("signin errors", graphQLErrors);
        toastGraphqlError(graphQLErrors);
      }

      if (networkError) {
        noInternetHandler();
      }
    },
  });

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container"
    >
      <div className="flex_center w-full min-h-screen">
        <div className="flex_col gap-[0.25rem]">
          <motion.div variants={authFadeOutVariants} className="auth_card">
            <div className="flex_col gap-[3rem]">
              <div className="flex_col items-center gap-[0.5rem]">
                <h2 className="title_h2">Qazini</h2>
                <h3 className="text-textColor text-h3 font-nunitoTitle">
                  Welcome Back
                </h3>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex_col gap-[1.5rem]"
              >
                <div className=" flex_col gap-[0.6rem]">
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      className="form_input bg-bodyColor"
                      placeholder="email address"
                    />
                    {formik.touched.email && (
                      <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                        {formik.errors.email}
                      </span>
                    )}
                  </>

                  <>
                    <div className="flex_between form_input bg-bodyColor items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        placeholder="password"
                        className="w-full bg-transparent"
                      />
                      {showPassword ? (
                        <span
                          onClick={(e) => setShowPassword(false)}
                          className="text-ctaColor pl-[0.75rem] hover_trans_dark_200"
                        >
                          <IoEyeOffSharp />
                        </span>
                      ) : (
                        <span
                          onClick={(e) => setShowPassword(true)}
                          className="text-ctaColor pl-[0.75rem] hover_trans_dark_200"
                        >
                          <IoEyeSharp />
                        </span>
                      )}
                    </div>
                    {formik.touched.password && (
                      <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                        {formik.errors.password}
                      </span>
                    )}
                  </>
                </div>
                <div className="flex justify-end items-end">
                  <div className="flex gap-[0.75rem] items-center">
                    <Link to={"/"} className="outline_button">
                      Cancel
                    </Link>
                    <button type="submit" className="cta_button">
                      {loading ? <LoadingDots /> : "Let's go"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="flex justify-start items-start gap-[0.5rem]">
                <p>New to Qazini?</p>
                <Link
                  to={"/register"}
                  className="text-ctaColor hover_trans_dark_200"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
          <div className="flex_center w-full">
            <p className="text-smaller md800:text-small">
              Copyright &#169; {new Date().getFullYear()}.{" "}
              <a
                href="https://pgitonga.vercel.app"
                className="text-textColor hover_trans_dark_200"
              >
                Lifen Creatives
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Signin;
