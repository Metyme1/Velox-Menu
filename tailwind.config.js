// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          600: "#7b2d3e",
          700: "#5c1f2a",
          800: "#441520",
        },
      },
    },
  },
  plugins: [],
};
