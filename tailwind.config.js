/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      spacing: {
        96: "24rem", // 96px
        144: "36rem", // 144px
        "mobile-flex-children": "calc(25% - 6px)",
      },
      margin: {
        192: "36.7rem",
        144: "31rem",
        90: "22rem",
      },
      colors: {
        "custom-purple": "#761be4",
        "custom-purple-hovered": "#6a19cd",
        "custom-light-purple": "#CBB6E5",
        "primary-text-color": "#000853",
      },
    },
  },
  plugins: [],
};
