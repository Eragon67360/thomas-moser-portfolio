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
        'background': '#1a1b1d'
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
  plugins: [],
}
