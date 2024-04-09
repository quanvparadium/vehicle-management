/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          logo: "#3563e9",
          border: "#c3d4e9",
        },
        bgHome: "#f6f7f9",
        gray450: "#91a4c0",
      },
      fontFamily: {
        custom: "Plus Jakarta Sans",
      },
      padding: {
        tb: "32px",
      },
    },
  },
  plugins: [],
};
