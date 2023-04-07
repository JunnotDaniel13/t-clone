/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        twitter: "#1D9BF0",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

module.exports = config;
