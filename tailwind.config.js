/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset");

module.exports = {
  presets: [nativewind],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "mark-it": "rgba(175, 40, 47, 1)",
        butter: "rgba(232, 201, 153, 1)",
        "grey-1": "rgba(133, 133, 133, 1)",
        "grey-2": "rgba(179, 179, 179, 1)",
        "grey-3": "rgba(217, 217, 217, 1)",
        "grey-4": "rgba(232, 232, 232, 1)",
        "grey-5": "rgba(245, 245, 245, 1)",
      },
      fontFamily: {
        "btn-font": "Wanted Sans-Bold",
        "h0-font": "Wanted Sans-SemiBold",
        "h1-font": "Wanted Sans-Medium",
        "h2-font": "Pretendard-Medium",
        "h2-bold-font": "Pretendard-SemiBold",
        "h2-light-font": "Pretendard-Regular",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};
