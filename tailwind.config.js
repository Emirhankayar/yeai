const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ['Oxanium', 'sans-serif'],
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      transitionProperty: {
        'max-height': 'max-height',
        'opacity': 'opacity',
        'blur': 'backdrop-blur',
      },
      opacity: {
        '0': '0',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
      backdropBlur: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'text-animation': 'textAnimation 1s both',

        'go-in': 'goIn 2s both',
        'slide-in-left': 'slideInLeft 2s both',
        'slide-in-right': 'slideInRight 1s both',
        'slide-in-down': 'slideInDown 2s both', 
        'slide-in-up': 'slideInUp 2s both', 
        'slide-in-up-late': 'slideInUpLate 2s both', 
        'shimmer': 'shimmer 1s infinite',
        'shift': 'shift 3s infinite',
        'shiftlarge': 'shift 4s infinite',
      },

      keyframes: {
        textAnimation: {
          '0%': { maxHeight: '0', opacity: '0', backdropBlur: '0' },
          '100%': { maxHeight: '100%', opacity: '1', backdropBlur: '16px' },
        },
        goIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideInDown: { 
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        slideInUp: { 
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        slideInUpLate: { 
          '0%': {
            transform: 'translateY(50%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        shift: {
          '0%': {
            backgroundPosition: '0px 0',
          },
          '100%': {
            backgroundPosition: '120px 0',
          },
        },
      },
      
      colors: {
        emerald: {
          50: "#3ECF8E0D",
          100: "#3ECF8E1A",
          200: "#3ECF8E33",
          300: "#3ECF8E4D",
          400: "#3ECF8E66",
          500: "#3ECF8E80",
          600: "#3ECF8E99",
          700: "#3ECF8EB2",
          800: "#3ECF8ECC",
          900: "#3ECF8EE5",
        },
        cream: {
          100: "#FBFBFB",
        }
      },
      extend: {
        backdropBlur: {
          'none': '0',
          'sm': '4px',
          'DEFAULT': '8px',
          'md': '12px',
          'lg': '16px',
          'xl': '24px',
          '2xl': '40px',
          '3xl': '64px',
        }
      }
    },
    variants: {
      extend: {
        backdropBlur: ['responsive'], // or other variants
      }
    },
  },
  plugins: [{
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    typography: {},
  },
  function({ addUtilities }) {
    const newUtilities = {
      '.hide-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
      '.hide-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
    }
    addUtilities(newUtilities)
  }
  ],
});