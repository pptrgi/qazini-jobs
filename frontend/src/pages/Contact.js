import {
  IoLogoWhatsapp,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoFacebook,
  IoGlobeOutline,
  IoLogoInstagram,
} from "react-icons/io5";

const Contact = () => {
  return (
    <section className="custom_container section_after_header">
      <div className="flex_center w-full">
        <div className="w-[95%] md480:w-[90%] md800:w-[80%]">
          <div className="flex_col gap-[3.5rem] w-full items-center md480:gap-[4rem]">
            <div className="h-[25vh] bg-tintColor2 w-full rounded-sm">
              <div className="flex_center w-full h-full">
                <h2 className="title_h2 leading-none">Contact Us</h2>
              </div>
            </div>

            <div className="w-full">
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
                  <form className="contact_form flex_col gap-[0.75rem]">
                    <input
                      type="text"
                      className="contact_form_input"
                      placeholder="fullname"
                    />
                    <input
                      type="email"
                      className="contact_form_input"
                      placeholder="example@email.com"
                    />
                    <input
                      type="text"
                      className="contact_form_input"
                      placeholder="message's subject"
                    />
                    <textarea
                      rows={5}
                      className="contact_form_input resize-none"
                      placeholder="message body"
                    />
                    <div className="flex_end w-full mt-[1.5rem]">
                      <button type="submit" className="cta_button capitalize">
                        send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 items-center gap-[1rem] md480:grid-cols-4">
                <div className="flex gap-[1rem] col-span-4 md480:col-span-2">
                  <span className="text-h2 text-darkColor">
                    <IoLogoLinkedin />
                  </span>
                  <span className="text-h2 text-darkColor">
                    <IoLogoWhatsapp />
                  </span>
                  <span className="text-h2 text-darkColor">
                    <IoLogoTwitter />
                  </span>
                  <span className="text-h2 text-darkColor">
                    <IoLogoFacebook />
                  </span>
                  <span className="hidden text-h2 text-darkColor md480:block">
                    <IoLogoInstagram />
                  </span>
                  <span className="text-h2 text-darkColor">
                    <IoGlobeOutline />
                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
