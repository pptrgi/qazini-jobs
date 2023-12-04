import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import { pageVariants, authFadeOutVariants } from "../transitions/transitions";
import { GET_USER_QUERY } from "../graphql/queries";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";
import { toastGraphqlError } from "../utils/toastGraphqlError";
import { noInternetHandler } from "../utils/noInternet";

// register form inputs schema
const registerSchema = yup.object({
  fullname: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .email("Provide a valid email")
    .required("Provide your email address"),
  password: yup.string().required("Password field is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // validate schema and start the register mutation operation on form submit
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      toast.info("Sign-up is under implementation. Coming soon");
      register_user_now({ variables: values });
    },
  });

  const [register_user_now, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(cache, { data }) {
      // const user = cache.readQuery({ query: GET_USER_QUERY });
      // console.log("user", user);
      console.log("data", data);

      formik.resetForm();

      navigate("/signin");
    },

    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log("register errors", graphQLErrors);
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
                  Welcome, Let's get started
                </h3>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex_col gap-[1.5rem]"
              >
                <div className=" flex_col gap-[0.6rem]">
                  <>
                    <input
                      type="text"
                      name="fullname"
                      value={formik.values.fullname}
                      onChange={formik.handleChange("fullname")}
                      onBlur={formik.handleBlur("fullname")}
                      className="form_input bg-bodyColor"
                      placeholder="full name"
                    />
                    {formik.touched.fullname && (
                      <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                        {formik.errors.fullname}
                      </span>
                    )}
                  </>
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
                        className="bg-transparent"
                        placeholder="password"
                      />
                      {showPassword ? (
                        <span
                          onClick={(e) => setShowPassword(false)}
                          className="text-ctaColor hover_trans_dark_200"
                        >
                          <IoEyeOffSharp />
                        </span>
                      ) : (
                        <span
                          onClick={(e) => setShowPassword(true)}
                          className="text-ctaColor hover_trans_dark_200"
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
                      {loading ? "registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex_col gap-[0.25rem]">
                <p className="text-smaller md800:text-small">
                  By registering, you agree to our{" "}
                  <a
                    href="https://nyumbahub.vercel.app/terms-of-service"
                    className="text-ctaColor/80 hover:text-ctaColor trans_200"
                  >
                    Terms of Service
                  </a>
                </p>
                <div className="flex justify-end items-end gap-[0.5rem]">
                  <p>Already in Qazini?</p>
                  <Link
                    to={"/signin"}
                    className="text-ctaColor hover_trans_dark_200"
                  >
                    Let's go
                  </Link>
                </div>
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

export default Register;
