import { PulseLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex_center w-full h-full">
        <PulseLoader color="#f3f5f7" size={10} speedMultiplier={1} />
      </div>
    </div>
  );
};

export default PageLoading;
