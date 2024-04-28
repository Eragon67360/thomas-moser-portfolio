import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  mode:'jit',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'hero': "url('../public/img/bg_hero.webp')",
      },
      backgroundColor:{
        'overlay': 'rgba(0, 0, 0, 0.8)',
      },
      cursor: {
          // default: 'url(/img/cursor.svg), default',
          // pointer: 'url(/img/cursor1.svg), pointer',
        
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "dark": {
          extend: "dark",
          colors: {
            background: "#090909",
            foreground: "#ffffff",
            primary: {
              50: "#ffe100",
              100: "#ffe100",
              200: "#ffd000",
              300: "#ffd000",
              400: "#FFBF00",
              500: "#FFBF00",
              600: "#FFBF00",
              700: "#cc9800",
              800: "#cc9800",
              900: "#7f5f00",
              DEFAULT: "#FFBF00",
              foreground: "#ffffff",
              svgFill: '#fff'
            },
            secondary: {
              DEFAULT: "#8F8F8F",
            },
            focus: "#FFBF00",
          },
        },

        "light": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#000",
            primary: {
              50: "#ffe100",
              100: "#ffe100",
              200: "#ffd000",
              300: "#ffd000",
              400: "#FFBF00",
              500: "#FFBF00",
              600: "#FFBF00",
              700: "#cc9800",
              800: "#cc9800",
              900: "#7f5f00",
              DEFAULT: "#FFBF00",
              foreground: "#000",
              svgFill: '#000'
            },
            secondary: {
              DEFAULT: "#8F8F8F",
            },
            focus: "#FFBF00",
          },
        },



      },
    }),
  ]
};
export default config;
