import { useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";
import { useTheme } from "../context/Theme/themeContext";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  const {theme} = useTheme()

   useEffect(() => {
     document.body.style.overflow = "hidden";
     return () => {
       document.body.style.overflow = "auto";
     };
   }, []);

  return (
    <div className="z-50 w-screen h-screen flex justify-center items-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] backdrop-brightness-50">
      <ScaleLoader
        color={theme === "dark" ? "#fff" : theme === "light" ? "#000" : (window.matchMedia("(prefers-color-scheme: dark)").matches) ? "#fff" : "#000"} 
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
