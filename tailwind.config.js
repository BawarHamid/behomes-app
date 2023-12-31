/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layout.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#FF385C",
        "primary-grey": "#5E5D5E",
        "primary-blue": "#455CC6",
        // "primary-blue": "#0000FF",
        "primary-medium-black": "#222222",
        "primary-dark": "#1A1A1A",
        "primary-yellow": "#FFC409",
        "primary-black": "#000000",
      },
    },
  },
  plugins: [],
};
