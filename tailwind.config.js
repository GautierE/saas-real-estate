/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
      serif: ["Inter"],
      mono: ["Inter"],
      title: ["Inter"],
    },
    extend: {
      colors: {
        primary: "#0048ad",
      },
    },
  },
  plugins: [],
};
