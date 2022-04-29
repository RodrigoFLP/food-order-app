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
      keyframes: {
        bouncein: {
          '100%': { transform: 'scale(1)' },
          '0%': { transform: 'scale(0.9)' },
          '70%': { transform: 'scale(0.95)' },
          '40%': {transform: 'scale(1.05)'}
        },
        bounceout: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        opacityin: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        opacityout: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        bouncein: 'bouncein 0.3s ease-in-out',
        opacityin: 'opacityin 0.3s ease-in-out',
        bounceout: 'bounceout 0.3s ease-in-out',
        opacityout: 'opacityout 0.3s ease-in-out',

      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}
