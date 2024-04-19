import { useState } from "react";
import {ScaleLoader} from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  
  return (
    <div className="w-full h-screen flex justify-center items-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#dfdede79]">
      <ScaleLoader
        color={"#000"}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
