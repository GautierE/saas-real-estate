/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
      serif: ["Inter"],
      mono: ["Inter"],
      title: ["Poppins"],
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        primary: "#0048ad",
        title: "rgb(0, 28, 69)",
        subTitle: "rgb(140, 136, 136)",
      },
      backgroundImage: {
        "background-pattern": "url(/assets/background-pattern.svg)",
      },
    },
  },
  plugins: [],
};
