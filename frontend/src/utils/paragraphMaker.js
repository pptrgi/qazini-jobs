import { LiaCheckSquareSolid } from "react-icons/lia";
import { FiCheckSquare } from "react-icons/fi";
import { BsCheck2Square } from "react-icons/bs";

export const paragraphMaker = (paragraphsArray, origin) => {
  // function accepts an array of paragraphs and the name of the content's origin then returns individual paragraphs styled based on the desired output of that content

  return paragraphsArray?.map((paragraph, index) => {
    return (
      <div key={index} className="flex gap-[0.5rem] mb-[0.75rem] items-start">
        {origin === "qualifications" && (
          <span className="text-normal text-textColor/90">
            <BsCheck2Square />
          </span>
        )}
        {origin === "responsibilities" && (
          <span className="text-textColor/90 font-semibolden">{`${
            index + 1
          }.`}</span>
        )}
        <p className="tracking-wide leading-tight">{paragraph}</p>
      </div>
    );
  });
};
