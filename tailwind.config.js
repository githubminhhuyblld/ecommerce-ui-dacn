/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        title: ["Montserrat-Bold"],
      },
      colors: {
        button: "#2565f5",
        primary: "#f57224",
        background:"rgba(0, 0, 0, .03)"
      },
    },
  },

};
