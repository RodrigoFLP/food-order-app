const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '400%': '400%',
    },
    extend: {
      colors: {
        'primary': '#ff3737',
        'secondary': '#301a4b',
        'shade': '#ededf4',
        'accent': '#59ffa0'
      },
      keyframes: {
        placeholder: {
          '0%' : {'background-position': '0% 50%'},
          '100%' : {'background-position': '100% 50%'}
        },
        bouncein: {
          '100%': { transform: 'scale(1)' },
          '0%': { transform: 'scale(0.9)' },
          '70%': { transform: 'scale(0.95)' },
          '40%': {transform: 'scale(1.05)'}
        },
        bounceout: {
          '0%': { transform: 'scale(1)'},
          '100%': { transform: 'scale(0)'},
        },
        heightin: {
          '0%': { transform: 'scaleY(0)', "transform-origin": "top" },
          '100%': { transform: 'scaleY(1)', "transform-origin": "top"  },
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
        placeholder: 'placeholder gradient 3s infinite',
        bouncein: 'bouncein 0.3s ease-in-out',
        opacityin: 'opacityin 0.3s ease-in-out',
        bounceout: 'bounceout 0.3s ease-in-out',
        opacityout: 'opacityout 0.3s ease-in-out',
        heightin: 'heightin 0.3s ease-in-out',


      }
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
    
          /* Firefox */
          'scrollbar-width': 'none',
    
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        'clip-rect': {
          'clip': 'rect(auto, auto, 0, auto)',
        },
        '.scrollbar-default': {
          /* IE and Edge */
          '-ms-overflow-style': 'auto',
    
          /* Firefox */
          'scrollbar-width': 'auto',
    
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'block'
          }
        }
      }, ['responsive'])
    }),
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}
