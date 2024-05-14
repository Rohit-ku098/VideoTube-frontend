import React, { useEffect } from "react";
import Modal from "./Modal";
import { useTheme } from "../context/Theme/themeContext";

function Appearance({ setAppearanceOpen }) {
  const { lightTheme, darkTheme, systemPreference, theme } = useTheme();
  
  const handleThemeToggle = (e) => {
    console.log(e.target.value);
    if (e.target.value === "light") {
      lightTheme();
    } else if (e.target.value === "dark") {
      darkTheme();
    } else {
      systemPreference();
    }
  };


  return (
    <div>
      <Modal
        title="Appearance"
        onCancel={() => setAppearanceOpen(false)}
      >
        <div className="flex flex-col gap-3 ">
          <label htmlFor="darkMode">
            <input
              type="radio"
              name="theme"
              id="darkMode"
              value={"dark"}
              checked={theme === "dark"}
              onChange={handleThemeToggle}
              className="accent-black mr-2"
            />
            Dark Mode
          </label>
          <label htmlFor="lightMode">
            <input
              type="radio"
              name="theme"
              id="lightMode"
              value={"light"}
              checked={theme === "light"}
              onChange={handleThemeToggle}
              className="accent-black mr-2"
            />
            Light Mode
          </label>
          <label htmlFor="systemDefault">
            <input
              type="radio"
              name="theme"
              id="systemDefault"
              value={"system"}
              checked={theme === "system"}
              onChange={handleThemeToggle}
              className="accent-black mr-2"
            />
            System Default
          </label>
        </div>
      </Modal>
    </div>
  );
}

export default Appearance;
