/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8A8A",
          100: "#FA7070",
        },
        secondary: "#FEFDED",
        Tertiary: {
          100: "#84c982",
          200: "#A1C398",
        },
      },
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
