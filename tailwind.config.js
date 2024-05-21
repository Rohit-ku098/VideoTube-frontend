/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f8f8",
        
        // backgroundDark: "#1a1a1a",
        // bgDarkSecondary: "#0b1120",
        
        backgroundDark: "#06161e",
        bgDarkSecondary: "#151d28",
        skeleton: "#ccc",
        skeletonDark: "#6b6b6b",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

