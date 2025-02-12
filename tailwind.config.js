import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Change from 'media' to 'class' for manual control
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FB923C",
        secondary: "#e74c3c",
      },
      fontFamily: {
        funnel: '"Funnel Sans", serif',
        epilogue: '"Epilogue", serif',
        inconsalata: '"Inconsolata", serif',
        sora: '"Sora", serif',
      },
    },
  },
  plugins: [daisyui],
};
