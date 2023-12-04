import { useRef } from "react";

import ReadMoreOrLessText from "../ReadMoreOrLessText";
import { paragraphMaker } from "../../utils/paragraphMaker";

const Descriptions = ({ description, qualifications, responsibilities }) => {
  const descriptionRef = useRef();

  return (
    <div className="flex_col gap-[2.5rem]">
      <section className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Description
        </h3>
        {description ? (
          <ReadMoreOrLessText text={description} nodeRef={descriptionRef} />
        ) : (
          <p>Job has no description</p>
        )}
      </section>
      <section className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Qualifications
        </h3>
        <div className="text-smaller md800:text-small">
          {qualifications
            ? paragraphMaker(qualifications, "qualifications")
            : "No qualifications mentioned"}
        </div>
      </section>
      <section className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Responsibilities
        </h3>
        <div className="text-smaller md800:text-small">
          {responsibilities
            ? paragraphMaker(responsibilities, "responsibilities")
            : "Employer hasn't stated any responsibilities"}
        </div>
      </section>
    </div>
  );
};

export default Descriptions;
