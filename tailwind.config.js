/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'poppinsSemi': ['PoppinsSemi', 'sans-serif'],
        'poppinsBold': ['PoppinsBold', 'sans-serif'],
      },
      colors: {
        yellow: "#FFDA61",
        blue: {
          DEFAULT: "#414EE3",
          '1': "#4D5AC3"
        },
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
