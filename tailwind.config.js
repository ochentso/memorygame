/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainPurple: "#634870",
        warmGray: "#DFC9C2",
        textLight: "#FFFAF2",
        textGhost: "#FFF7EA",
        dustyRose: "#DDBDB3",
        cardBack: "#CEB2BA",
      },
    },

    fontFamily: {
      main: ["Lato", "sans-serif"],
    },
  },
  plugins: [],
};
