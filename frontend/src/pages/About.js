import { RiDoubleQuotesL } from "react-icons/ri";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="custom_container section_after_header">
      <div className="flex_center w-full">
        <div className="w-[95%] md480:w-[90%] md800:w-[80%]">
          <div className="flex_col gap-[2rem] w-full items-center">
            <div className="h-[25vh] bg-tintColor2 w-full rounded-sm">
              <div className="flex_center w-full h-full">
                <div className="flex_col gap-[0.5rem] items-center">
                  <h2 className="title_h2 leading-none">About Us</h2>
                  <p className="px-[0.5rem] text-center">
                    Qazini is not just a job search site, we're the answer
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="flex_col gap-[2.5rem]">
                <div className="flex_col gap-[1.75rem]">
                  <div className="flex gap-[0.5rem] items-center overflow-hidden">
                    <span className="h-[40px] w-[3px] bg-ctaColor rounded-sm"></span>
                    <p>
                      Qazini takes the job you've been looking for, wraps it and
                      gifts it to you. You deserve it.
                    </p>
                  </div>
                  <div className="flex gap-[0.5rem] items-center overflow-hidden">
                    <span className="h-[60px] w-[5px] bg-ctaColor rounded-sm lg1023:h-[50px] "></span>
                    <p>
                      While job vacancies are there, we are committed to do
                      whatever we can to help easen the job search (a job by
                      itself) for the folks we believe in. Including you.
                    </p>
                  </div>

                  <div className="flex gap-[0.5rem] items-center overflow-hidden">
                    <span className="h-[300px] w-[8px] bg-ctaColor rounded-sm lg1023:h-[250px]"></span>
                    <div className="flex_col gap-[0.5rem]">
                      <p>
                        That means a ton of latest opportunities from a dozen
                        industries within a location or two or more, or
                        globally.
                      </p>
                      <p>
                        But we have a problem - uh-oh. As you may have noticed,
                        we are limited on the number of opportunities we supply
                        (max 10), why? We are depending on another job
                        provider's service for our posts, which is very generous
                        of{" "}
                        <a href="" className="text-ctaColor">
                          JSearch
                        </a>{" "}
                        nevertheless.
                      </p>
                      <p>
                        If you'd like to see us increase our posts you can
                        support us to get the{" "}
                        <a href="" className="text-ctaColor">
                          JSearch's
                        </a>{" "}
                        premium plan, and we'll greatly appreciate it. Or
                        undirectly, support JSearch so maybe in future they'll
                        increase their freemium limit, a big maybe.
                      </p>
                      <p>
                        We also welcome employers to advertise their jobs in our
                        platform. Again, problem solved.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex_center w-full">
                  {/* Add the founder's quote - haha (-_^) */}
                  <div className="bg-tintColor border-[1.8px] border-darkColor rounded-md px-[0.75rem] pt-[1.5rem] pb-[1rem] max-w-lg">
                    <div className="flex_col gap-[0.5rem] items-center">
                      <div className="flex gap-2">
                        <span className="text-h2">
                          <RiDoubleQuotesL />
                        </span>
                        <p>
                          An additional job in here is an additional chance for
                          someone out there.
                        </p>
                      </div>
                      <div className="flex_end w-full">
                        <span className="uppercase italic text-tiny md480:text-smaller">
                          ~ qazini founder - peter
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex_col gap-[0.5rem]">
                  <p className="text-normal max-w-[230px] text-darkColor md480:text-h3">
                    Now, y'all ready for some opportunities?
                  </p>
                  <div className="flex_col gap-[0.25rem] md480:flex-row md480:gap-[0.4rem]">
                    <p>We get it, you're here to seize the opportunities.</p>
                    <Link to={"/"} className="text-ctaColor">
                      Right here
                    </Link>
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

export default About;
