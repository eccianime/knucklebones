/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f1e8d4',
          200: '#585858',
          300: '#ea3424',
          400: '#17150D',
          500: '#CE2D1F',
        },
      },
      fontFamily: {
        LaptureSemiBold: 'LaptureSemibold',
      },
    },
  },
  plugins: [],
};
