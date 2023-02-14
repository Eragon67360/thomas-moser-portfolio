/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  scrolled: "class",  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: '#b160ef',
      },
      fontFamily: {
        burtons: "burtons",
        montserrat: ['Montserrat'],
      },
      backgroundImage: {
        'hero_dark': "url('../public/hero_1.jpg')",
        'hero_light': "url('../public/hero.jpg')",
        'project1-bg': "url('../public/mobile.jpg')",
      },
      transitionProperty:{

      },
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 0s infinite alternate-reverse both',
        'bg':'gradient 5s ease infinite',
      },
      keyframes: {
        type: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6ch' },
          '65%, 70%': { width: '7ch' },
          '75%, 80%': { width: '8ch' },
          '85%, 90%': { width: '9ch' },
          '95%': { width: '10ch' },
        },
        'bg': {
          "0%" :{
              "background-position":" 0% 0%",
          },
          "50%": {
              "background-position": "100% 100%",
          },
          "100%": {
              "background-position": "0% 0%",
          }
        },
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