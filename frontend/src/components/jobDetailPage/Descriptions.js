import React from "react";

import { jobsData } from "../jobsFeed/JobsData";

const Descriptions = ({ description, qualifications, responsibilities }) => {
  const paragraphMaker = (paragraphsArray) => {
    return paragraphsArray?.map((paragraph, index) => {
      return (
        <p key={index} className="mb-[0.75rem]">
          {paragraph[index]}
        </p>
      );
    });
  };

  return (
    <div className="flex_col gap-[2.5rem]">
      <div className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Description
        </h3>
        <p className="text-smaller md800:text-small">{description}</p>
      </div>
      <div className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Qualifications
        </h3>
        <div className="text-smaller md800:text-small">
          {paragraphMaker(qualifications)}
        </div>
      </div>
      <div className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Requirements
        </h3>
        <div className="text-smaller md800:text-small">
          {paragraphMaker(responsibilities)}
        </div>
      </div>
    </div>
  );
};

export default Descriptions;
