/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#2b2d42",
        // secondary: "#8d99ae",
        // tertiary: "#edf2f4",
        background: "#f8f8f8",
        backgroundDark: "#06161e",
        // backgroundDark: "#1a1a1a",
        // bgDarkSecondary: "#0b1120",
        bgDarkSecondary: "#151d28",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

