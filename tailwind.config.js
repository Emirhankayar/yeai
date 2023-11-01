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
      animation: {
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
    },
  },
  plugins: [{
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }],
});