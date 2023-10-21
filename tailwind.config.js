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
        'slide-in-left': 'slideInLeft 1s both',
        'slide-in-right': 'slideInRight 1s both',
        'slide-in-down': 'slideInDown 2s infinite', 
        'shimmer': 'shimmer 1s infinite',
      },

      keyframes: {
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
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
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
  plugins: [],
});