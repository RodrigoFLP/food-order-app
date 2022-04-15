module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff3737',
        'secondary': '#301a4b',
        'shade': '#ededf4',
        'accent': '#59ffa0'
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}
