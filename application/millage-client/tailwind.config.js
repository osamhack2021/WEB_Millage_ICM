module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          light: '#10A02C',
          DEFAULT: '#10902C',
          dark: '#10602C'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
