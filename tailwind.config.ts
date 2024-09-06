import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'blue': '#7DD5D0',
      'pink': '#C299A1',
      'orange': '#CE6E52',
      'green': '#B6C98C',
      'yellow': '#E3D4AF',
      'dark': '#140F1C',
      'gray': '#EAEAEA',
      'gray-light': '#F5F5F5',
      'white': '#fff'
    },
    borderRadius: {
      'sm': '8px',
      'md': '16px',
      'lg': '40px',

    },
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica)'],
        display: ['var(--font-unbounded)'],
      },
      boxShadow: {
        '3xl': '0px 2px 100px 0px #2E2E2EB0',
      }
    },
  },
  plugins: [],
};
export default config;
