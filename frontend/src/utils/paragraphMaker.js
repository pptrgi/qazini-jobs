import { LiaCheckSquareSolid } from "react-icons/lia";

export const paragraphMaker = (paragraphsArray, origin) => {
  // function accepts an array of paragraphs and the name of the content's origin then returns individual paragraphs styled based on the desired output of that content

  return paragraphsArray?.map((paragraph, index) => {
    return (
      <div key={index} className="flex gap-[0.5rem] mb-[0.75rem] items-start">
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
