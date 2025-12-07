/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset");

module.exports = {
  presets: [nativewind],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "mark-it": "var(--mark-it)",
        white: "var(--white)",
        black: "var(--black)",
        yellow: "var(--yellow)",
        "grey-1": "var(--grey-1)",
        "grey-2": "var(--grey-2)",
        "grey-3": "var(--grey-3)",
        "grey-4": "var(--grey-4)",
        "grey-5": "var(--grey-5)",
      },
      fontFamily: {
        btn: "var(--btn-font-family)",
        h1: "var(--h1-font-family)",
        h2: "var(--h2-font-family)",
        "h2-bold": "var(--h2-bold-font-family)",
        "h2-light": "var(--h2-light-font-family)",
        url: "var(--url-font-family)",
      },
    },
  },
  plugins: [],
};
