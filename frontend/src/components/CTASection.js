import React from "react";

const CTASection = () => {
  return (
    <section className="custom_container section">
      <div className="w-full">
        <div className="flex_center w-full lg1120:mx-[0.75rem]">
          <div className="px-[1rem] py-[1.75rem] bg-tintColor2 w-full border-[2px] border-tintClearColor rounded-md lg1120:px-[1.5rem]">
            <div className="flex_col gap-[0.5rem] items-start md480:gap-[1rem]">
              {/* <h2 className="text-darkColor font-semibolden text-[1.4rem] tracking-wide md480:text-[2rem]">
                Want jobs to look for you?
              </h2> */}
              <h2 className="text-darkColor font-bolden text-h3 tracking-wide md480:text-h2">
                Would you like jobs to look for you?
              </h2>
              <div className="flex flex-col justify-between w-full gap-[1.25rem] md480:flex-row md480:gap-[1.5rem]">
                <p className="w-full tracking-wide max-w-xs md480:w-[40%] text-darkColor">
                  Get job updates and exciting news delivered to your inbox
                  every week
                </p>
                <div className="flex_col gap-[1rem] w-full md480:w-[60%]">
                  <form className="grid grid-cols-1 gap-[0.75rem] w-full md480:grid-cols-7 md480:gap-[0.5rem]">
                    <input
                      type="email"
                      className="col-span-1 px-[0.75rem] py-[0.75rem] rounded-md bg-bodyColor border-[2px] border-tintClearColor font-semibolden tracking-wide text-darkColor hover:border-ctaColor focus:border-ctaColor md480:col-span-5"
                      placeholder="email@example.com"
                    />
                    <button
                      type="submit"
                      className="col-span-1 px-[0.75rem] py-[0.75rem] rounded-md bg-darkColor text-bodyColor tracking-wide truncate hover:bg-ctaColor md480:col-span-2"
                    >
                      Get Jobs
                    </button>
                  </form>
                  <div>
                    <p className="text-tiny tracking-wide md480:text-smaller">
                      By signing up, you agree to our{" "}
                      <span className="text-ctaColor">Terms of Service</span>
                    </p>
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

export default CTASection;
