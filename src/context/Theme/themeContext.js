import { createContext, useContext } from "react";

const themeContext = createContext({
    theme: "system",
    darkTheme: () => {},
    lightTheme: () => {},
    systemPreference: () => {},
});

export default themeContext

export const useTheme = () => useContext(themeContext)