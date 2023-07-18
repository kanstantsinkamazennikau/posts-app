/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(200px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        slide: "slide 0.5s",
      },
    },
  },
  plugins: [],
};
