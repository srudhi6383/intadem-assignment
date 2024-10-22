/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your directory structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        propel: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(25%)" },
          "40%": { transform: "translateX(-25%)" },
          "60%": { transform: "translateX(25%)" },
          "100%": { transform: "translateX(-25%)" },
        },
      },
    },
  },
  plugins: [],
  addUtilities: {
    ".no-scrollbar": {
      "::-webkit-scrollbar": { display: "none" },
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
    },
  },
};