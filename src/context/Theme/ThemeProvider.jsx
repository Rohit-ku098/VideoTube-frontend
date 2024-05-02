import React, { useEffect } from "react";
import themeContext, { useTheme } from "./themeContext";

function ThemeProvider({ children }) {
  
 
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
  }

  handleTheme();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", handleTheme);
    return () => mq.removeEventListener("change", handleTheme)
  }, [])

  const darkTheme = () => {
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  };

  const lightTheme = () => {
    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  };

  const systemPreference = () => {
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
    handleTheme();
  };


  return (
    <themeContext.Provider value={{ darkTheme, lightTheme, systemPreference }}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeProvider;
