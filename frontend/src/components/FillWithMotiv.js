const FillWithMotiv = () => {
  return (
    <div className="absolute bottom-[15%] -right-[0.5rem] rotate-50">
      <div className="relative flex_col gap-[0.125rem] items-center min-w-[150px]">
        <span className="tracking-tight text-normal text-lightGrayColor/50 uppercase font-bolden italic md480:text-h3">
          keep
        </span>
        <span className="tracking-wider text-h3 text-lightGrayColor/50 uppercase font-bolden italic md480:text-h2">
          winning
        </span>
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[18%] left-[18%] w-[23px] rotate-180"
        />
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[10%] right-[11%] w-[31px]"
        />
      </div>
    </div>
  );
};

export default FillWithMotiv;
