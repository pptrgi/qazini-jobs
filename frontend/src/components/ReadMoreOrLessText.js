import { useState, useEffect } from "react";

const ReadMoreOrLessText = ({ text, nodeRef }) => {
  const [clamped, setClamped] = useState(true);
  const [showReadButtons, setShowReadButtons] = useState(false);

  useEffect(() => {
    // if the content height is not scrollable, don't show buttons
    setShowReadButtons(
      nodeRef.current.scrollHeight !== nodeRef.current.clientHeight
    );
  }, []);

  return (
    <div className="flex_col gap-[0.25rem] text-smaller md800:text-small">
      <p
        ref={nodeRef}
        className={`${
          clamped ? "clamp_paragraph" : ""
        } tracking-wide leading-5 font-semibolden`}
      >
        {text}
      </p>
      {showReadButtons && (
        <span
          onClick={(e) => setClamped(!clamped)}
          className="pl-[0.5rem] w-fit font-bolden text-tintClearColor tracking-wide cursor-pointer hover:text-ctaColor/80 trans_200"
        >
          {clamped ? "Read more" : "Read less"}
        </span>
      )}
    </div>
  );
};

export default ReadMoreOrLessText;
