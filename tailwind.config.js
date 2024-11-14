/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FA7070",
        senondary: "#FEFDED",
        Tertiary: {
          100: "#C6EBC5",
          200: "#A1C398",
        },
      },
    },
  },
  plugins: [],
};
