import { useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
   useEffect(() => {
     document.body.style.overflow = "hidden";
     return () => {
       document.body.style.overflow = "auto";
     };
   }, []);

  return (
    <div className="z-50 w-screen h-screen flex justify-center items-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] backdrop-brightness-90">
      <ScaleLoader
        color={"#000"} // TODO: darkMode loader color
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
