/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/html/home.html",
    "./src/html/leaderboard.html",
    "./src/html/about.html",
    "./src/css/home.css",
    "./src/html/forstyles.html"], //to make sure styles for cards stay in the css
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "aqua", "night"],
  },
}
