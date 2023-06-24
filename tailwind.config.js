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
        redAccent: "#ec5870",
        title: "rgb(0, 28, 69)",
        subTitle: "rgb(140, 136, 136)",
        error: "#f44336",
      },
      backgroundImage: {
        "background-pattern": "url(/assets/background-pattern.svg)",
      },
    },
  },
  plugins: [],
};
