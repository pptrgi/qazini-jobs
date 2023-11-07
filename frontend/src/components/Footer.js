import { IoHeart } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="bg-tintColor mt-[3rem] pt-[3rem] pb-[2rem]">
      <div className="flex_center w-full">
        <div className="flex gap-[0.35rem] items-center">
          <p>Built with</p>
          <span className="text-ctaColor text-h3">
            <IoHeart />
          </span>
          <p>
            by{" "}
            <span className="font-semibolden text-darkColor">
              Lifen Creatives
            </span>{" "}
            &#169; 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
