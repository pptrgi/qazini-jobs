import { LiaCheckSquareSolid } from "react-icons/lia";

const Descriptions = ({ description, qualifications, responsibilities }) => {
  // function accepts an array of paragraphs then returns individual paragraphs styled based on the desired output of that information
  const paragraphMaker = (paragraphsArray, origin) => {
    return paragraphsArray?.map((paragraph, index) => {
      return (
        <div key={index} className="mb-[0.75rem] flex gap-[0.5rem] items-start">
          {origin === "qualifications" && (
            <span className="text-normal">
              <LiaCheckSquareSolid />
            </span>
          )}
          {origin === "responsibilities" && <span>{`${index + 1}.`}</span>}
          <p>{paragraph}</p>
        </div>
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
          {paragraphMaker(qualifications, "qualifications")}
        </div>
      </div>
      <div className="flex_col gap-[0.75rem]">
        <h3 className="title_normal border-b-[1px] border-gray-200">
          Responsibilities
        </h3>
        <div className="text-smaller md800:text-small">
          {paragraphMaker(responsibilities, "responsibilities")}
        </div>
      </div>
    </div>
  );
};

export default Descriptions;
