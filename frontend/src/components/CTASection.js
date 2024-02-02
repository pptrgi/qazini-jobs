import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";

import { SUBSCRIBE_EMAIL } from "../graphql/mutations";
import { fadeOutVariants } from "../transitions/transitions";
import LoadingDots from "./LoadingDots";

// subscribe schema
const subscribeSchema = yup.object({
  email: yup
    .string()
    .email("Provide a valid email")
    .required("Provide your email to subscribe"),
});

const CTASection = () => {
  // validate schema and start the subscribe mutation operation on form submit
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: subscribeSchema,
    onSubmit: (values) => {
      subscribe_email_now({ variables: values });
    },
  });

  // Subscribe operation
  const [subscribe_email_now, { loading }] = useMutation(SUBSCRIBE_EMAIL, {
    update(_, { data: { subscribe_with_email } }) {
      const subcribed_email = subscribe_with_email.email;

      // on successful subscription, reset the input field
      formik.resetForm();

      toast.success(`${subcribed_email} has subcribed successfully`);
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        graphQLErrors.map((error) => toast.error(`${error.message}`));
      }
    },
  });

  return (
    <motion.section
      variants={fadeOutVariants}
      className="custom_container cta_section"
    >
      <div className="w-full">
        <div className="flex_center md800:mx-[0.75rem] lg1023:mx-[2rem] lg1120:mx-[3rem]">
          <div className="relative px-[1rem] py-[2rem] bg-tintColor2 w-full border-[2px] border-tintClearColor rounded-xl lg1120:px-[1.5rem] lg1120:py-[2.25rem]">
            <div className="flex_col gap-[1rem] items-start md480:gap-[1.5rem]">
              <h2 className="text-darkColor font-bolden text-h3 tracking-wide md480:text-h2">
                Would you like jobs to look for you?
              </h2>
              <div className="flex flex-col justify-between w-full gap-[1.25rem] md480:flex-row md480:gap-[1.5rem]">
                <p className="w-full tracking-wide max-w-xs md480:w-[40%] text-darkColor">
                  Get job updates and exciting news delivered to your inbox
                  every week
                </p>
                <div className="flex_col gap-[1rem] w-full md480:w-[60%]">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 gap-[0.75rem] w-full md480:grid-cols-7 md480:gap-[0.5rem]"
                  >
                    <input
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      className="col-span-1 md480:col-span-5 px-[0.75rem] w-full py-[0.75rem] rounded-md bg-bodyColor border-[2px] border-tintClearColor font-semibolden tracking-wide text-darkColor hover:border-ctaColor focus:border-ctaColor trans_200"
                      placeholder="email@example.com"
                    />
                    <div className="flex_center col-span-1 md480:col-span-2">
                      <button
                        type="submit"
                        className="px-[0.75rem] py-[0.75rem] w-full rounded-md bg-darkColor text-bodyColor tracking-wide truncate hover:bg-ctaColor transition duration-200"
                      >
                        {loading ? <LoadingDots /> : "Get Jobs"}
                      </button>
                    </div>
                  </form>
                  <div className="z-10">
                    <p className="text-tiny tracking-wide md480:text-smaller">
                      By signing up, you agree to our{" "}
                      <a
                        href="https://nyumbahub.vercel.app/terms-of-service"
                        className="text-ctaColor hover:text-ctaColor/80 trans_200"
                      >
                        Terms of Service
                      </a>
                    </p>
                  </div>
                  {formik.touched.email && (
                    <p className="text-smaller tracking-wide text-red-400 font-semibolden md480:text-small">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-[0.5rem] right-[0.5rem] md480:bottom-[0.75rem]">
              <img
                src="/sparkles.svg"
                alt="sparkles"
                className="w-[30px] md480:w-[35px]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
