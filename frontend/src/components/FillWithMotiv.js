const FillWithMotiv = () => {
  return (
    <div className="absolute bottom-[15%] -right-[0.5rem] rotate-50">
      <div className="relative flex_col gap-[0.5rem] items-center min-w-[150px]">
        <span className="tracking-tight text-lightGrayColor/50 uppercase font-bolden italic">
          keep
        </span>
        <span className="tracking-wider text-h3 text-lightGrayColor/50 uppercase font-bolden italic md480:text-h2">
          winning
        </span>
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[15%] left-[20%] w-[23px]"
        />
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[10%] right-[5%] w-[30px]"
        />
      </div>
    </div>
  );
};

export default FillWithMotiv;
