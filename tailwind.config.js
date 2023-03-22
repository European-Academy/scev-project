/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#FFDA61",
        blue: "#414EE3",
        gray: {
        DEFAULT: "#42484D",
        '1': "#CCCFCD",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
