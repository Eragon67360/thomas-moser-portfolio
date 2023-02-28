/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {    
    extend: {
      colors: {
        'primary': '#d4af37',
        'background': '#1a1b1d',
        'gradient':'bg-gradient-to-r from-amber-300 to-fuchsia-700'
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        'display': ['Montserrat'],
        'body': ['Montserrat'],
      },
      backgroundImage: {
        'bg_gradient': "url('../public/bg_gradient.png')",
        'project1-bg': "url('../public/mobile.jpg')",
      },
    },
  },
  screens: {
    xs: '300px',
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
  plugins: [
    require('tw-elements/dist/plugin','tailwindcss-ripple'),    
  ],
}
