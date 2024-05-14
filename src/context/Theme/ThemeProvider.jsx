import React, { useEffect, useState } from "react";
import themeContext, { useTheme } from "./themeContext";

function ThemeProvider({ children }) {
  
  const [theme, setTheme] = useState("system");
  const handleTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      setTheme("dark");
    } else if (localStorage.theme === "light") {
      setTheme("light");
    } else {
      setTheme("system");
    }

  }




  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", handleTheme);
    handleTheme();
    return () => mq.removeEventListener("change", handleTheme)
  }, [])

  const darkTheme = () => {
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    handleTheme();
  };

  const lightTheme = () => {
    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";
    handleTheme();
  };

  const systemPreference = () => {
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
    handleTheme();
  };


  return (
    <themeContext.Provider value={{ darkTheme, lightTheme, systemPreference, theme }}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeProvider;
