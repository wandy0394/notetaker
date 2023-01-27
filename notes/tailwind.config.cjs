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
    // minHeight: {
    //   '0':'0',
    //   '1/4': '25%',
    //   '1/2':'50%',
    //   '3/4':'75%',
    //   'full':'100%'
    // }
  },

  plugins: [],
}
