/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xm: { max: "320px" },
      xm360: { max: "360px" },
      sm: { min: "375px" },
      md480: { min: "480px" },
      md800: { min: "800px" },
      lg1023: { min: "1023px" },
      lg1120: { min: "1120px" },
      xl1300: { min: "1300px" },
      xl2048: { min: "2048px" },
    },
    extend: {
      colors: {
        titleColor: "#040507",
        textColor: "#606774",
        ctaColor: "#FF229A",
        bodyColor: "white",
        darkColor: "#0E0008",
        tintColor: "#FFFAFD",
        tintColor2: "#FFE6F4",
        tintColor3: "#FFD3EB",
        tintColor4: "#FFBFE2",
        halfDarkColor: "#220012",
        skeletonColor: "#d9d9d9",
        lightGrayColor: "#f3f5f7",
      },
      fontSize: {
        large: "3rem",
        h1: "2.5rem",
        h2: "1.5rem",
        h3: "1.25rem",
        normal: "1rem",
        small: "0.825rem",
        smaller: "0.816rem",
        tiny: "0.625rem",
      },
      fontWeight: {
        unboldened: 400,
        semibolden: 500,
        bolden: 700,
      },
      fontFamily: {
        nunitoTitle: ["Nunito-Semibold"],
        nunitoText: ["Nunito-Normal"],
      },
    },
  },
  plugins: [],
};

// nunitoTitle: ["Nunito-Semibold", "sans-serif"],
// nunitoText: ["Nunito-Normal", "sans-serif"],
