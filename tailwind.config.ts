/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "1fr 60rem 1fr",
      },
      gridTemplateRows: {
        main: "0.1fr 1fr 0.1fr",
      },
    },
  },
  plugins: [],
};
