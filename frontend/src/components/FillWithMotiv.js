const FillWithMotiv = () => {
  return (
    <div className="hidden absolute top-[16%] -right-[0.75rem] rotate-50 md800:block">
      <div className="relative flex_col gap-[0.5rem] items-center min-w-[150px]">
        <span className="tracking-tight text-h3 text-lightGrayColor font-bolden italic">
          keep
        </span>
        <span className="tracking-wider text-h2 text-lightGrayColor  font-bolden italic">
          winning
        </span>
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[15%] left-[10%] w-[23px]"
        />
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[40%] right-[50%] w-[18px]"
        />
        <img
          src="/sparkles.svg"
          alt="sparkles"
          className="absolute top-[25%] right-[5%] w-[30px]"
        />
      </div>
    </div>
  );
};

export default FillWithMotiv;
