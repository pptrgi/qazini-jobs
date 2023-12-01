import { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { sendForm } from "@emailjs/browser";
import {
  RiWhatsappFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiPhoneFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";
import { motion } from "framer-motion";

import {
  pageVariants,
  slideGoingLeftVariants,
  slideGoingRightVariants,
  pageTitleFadeOutVariants,
} from "../transitions/transitions";
import { toast } from "react-toastify";

// contact form inputs schema
const contactSchema = yup.object({
  fullname: yup.string().required("Enter your full name"),
  email: yup
    .string()
    .email("Provide a valid email")
    .required("Provide your email address"),
  subject: yup.string().required("Specify the subject for the message"),
  message: yup.string().required("You can't send an empty message body"),
});

const Contact = () => {
  const contactFormRef = useRef();

  // validate schema and send the form contents to company email using emailjs email service
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      sendForm(
        `${process.env.REACT_APP_SERVICE_ID}`,
        `${process.env.REACT_APP_TEMPLATE_ID}`,
        contactFormRef.current,
        `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`
      )
        .then(() => {
          toast.success("Message has been sent!");
          resetForm();
        })
        .catch((error) => console.log(error));
    },
  });
  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="custom_container section_after_header"
    >
      <div className="flex_center w-full">
        <div className="w-[95%] md480:w-[90%] md800:w-[80%]">
          <div className="flex_col gap-[3.5rem] w-full items-center md480:gap-[4rem]">
            <motion.div
              variants={pageTitleFadeOutVariants}
              className="relative h-[10rem] bg-tintColor2 w-full rounded-sm overflow-hidden md480:h-[13rem]"
            >
              <div className="flex_center w-full h-full">
                <div className="flex_col gap-[0.5rem] items-center">
                  <h2 className="title_h2 leading-none">Contact Us</h2>
                  <p className="px-[0.5rem] text-center z-10">
                    Get in touch with us, anytime
                  </p>
                </div>
              </div>
              <span className="absolute -bottom-[70px] -right-[90px] w-[130px] h-[150px] rounded-full bg-tintClearColor md480:w-[150px] md480:-right-[80px] md480:-bottom-[20px]"></span>
            </motion.div>

            <motion.div variants={slideGoingLeftVariants} className="w-full">
              <div className="grid grid-cols-1 gap-[0.75rem] items-center md480:grid-cols-6">
                <div className="flex_start_center w-full col-span-6 md480:col-span-2">
                  <div className="block md480:flex md480:items-center">
                    <div className="flex_col w-full gap-[0.25rem] md480:gap-[0.5rem]">
                      <h4 className="text-normal tracking-wider leading-none">
                        Start a
                      </h4>
                      <h3 className="text-h3 tracking-wider leading-none">
                        Conversation
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex_start_end w-full col-span-6 md480:col-span-4">
                  <form
                    ref={contactFormRef}
                    onSubmit={formik.handleSubmit}
                    className="contact_form flex_col gap-[0.6rem]"
                  >
                    <>
                      <input
                        type="text"
                        value={formik.values.fullname}
                        onChange={formik.handleChange("fullname")}
                        onBlur={formik.handleBlur("fullname")}
                        className="contact_form_input"
                        placeholder="fullname"
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
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="contact_form_input"
                        placeholder="example@email.com"
                      />
                      {formik.touched.email && (
                        <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                          {formik.errors.email}
                        </span>
                      )}
                    </>

                    <>
                      <input
                        type="text"
                        value={formik.values.subject}
                        onChange={formik.handleChange("subject")}
                        onBlur={formik.handleBlur("subject")}
                        className="contact_form_input"
                        placeholder="message's subject"
                      />
                      {formik.touched.subject && (
                        <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                          {formik.errors.subject}
                        </span>
                      )}
                    </>
                    <>
                      <textarea
                        rows={5}
                        value={formik.values.message}
                        onChange={formik.handleChange("message")}
                        onBlur={formik.handleBlur("message")}
                        className="contact_form_input resize-none"
                        placeholder="the message body"
                      />
                      {formik.touched.message && (
                        <span className="text-smaller text-red-400 pl-[0.5rem] md480:text-small">
                          {formik.errors.message}
                        </span>
                      )}
                    </>

                    <div className="flex_end w-full mt-[1.5rem]">
                      <button type="submit" className="cta_button capitalize">
                        send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideGoingRightVariants} className="w-full">
              <div className="grid grid-cols-1 items-center gap-[1rem] md480:grid-cols-4">
                <div className="flex gap-[0.9rem] col-span-4 md480:col-span-2 md480:gap-[1rem]">
                  <a
                    href="https://www.linkedin.com/in/petergitonga"
                    className="contact_social_icon"
                  >
                    <RiLinkedinFill />
                  </a>
                  <a
                    href="https://wa.me/254700119134"
                    className="contact_social_icon"
                  >
                    <RiWhatsappFill />
                  </a>
                  <a
                    href="https://x.com/ptrgitonga"
                    className="contact_social_icon"
                  >
                    <RiTwitterXFill />
                  </a>
                  <a
                    href="https://www.facebook.com/petergitonga"
                    className="contact_social_icon"
                  >
                    <RiFacebookFill />
                  </a>
                  <span className="hidden contact_social_icon cursor-auto md480:block">
                    <RiInstagramFill />
                  </span>
                  <a href="tel:254700119134" className="contact_social_icon">
                    <RiPhoneFill />
                  </a>
                </div>
                <div className="col-span-4 md480:col-span-2">
                  <div className="flex_start_center w-full">
                    <div className="flex_col gap-[0.25rem] col-span-6 md480:col-span-2 md480:gap-[0.5rem]">
                      <h4 className="text-normal tracking-wider leading-none">
                        How about on
                      </h4>
                      <h3 className="text-h3 tracking-wider leading-none">
                        Socials?
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
