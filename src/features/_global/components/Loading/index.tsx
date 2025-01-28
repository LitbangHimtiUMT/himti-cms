import Lottie from "lottie-react";
import LoadingJSON from "../../../../core/assets/lottie/loading.json";

export const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie
        animationData={LoadingJSON}
        loop={true}
        style={{
          width: "20rem",
        }}
      />
    </div>
  );
};
