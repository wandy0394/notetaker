/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: '360px',
        sm: '480px',
        md: '768px',
        lg: '1440px',
        xl: '1920px'
      },
    },
  },

  plugins: [],
}
