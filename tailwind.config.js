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
      roboto: ["Roboto"],
    },
    extend: {
      colors: {
        primary: "#0048ad",
        secondary: "#001c45",
        blueAccent: "#076ad0",
        redAccent: "#ec5870",
        title: "rgb(0, 28, 69)",
        subTitle: "rgb(140, 136, 136)",
        customGrey: "#414141",
        error: "#f44336",
        agent360: "#03cea4",
        adb360: "#fac748",
        data360: "#473bf0",
        api: "#ff6b6b",
      },
      backgroundImage: {
        "background-pattern": "url(/assets/background-pattern.svg)",
        "background-graphic":
          "url(/assets/testimonials-section/testimonials-background-graphic.svg)",
      },
    },
  },
  plugins: [],
};
