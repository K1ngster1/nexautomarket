/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Додає підтримку темної теми через клас .dark
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
