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
        <ReadMoreOrLessText text={description} nodeRef={descriptionRef} />
      </section>
      <section className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Qualifications
        </h3>
        <div className="text-smaller md800:text-small">
          {paragraphMaker(qualifications, "qualifications")}
        </div>
      </section>
      <section className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Responsibilities
        </h3>
        <div className="text-smaller md800:text-small">
          {paragraphMaker(responsibilities, "responsibilities")}
        </div>
      </section>
    </div>
  );
};

export default Descriptions;
