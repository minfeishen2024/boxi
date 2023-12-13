import type { Config } from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      body: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        'background-1': '#FFF8E8', //biege
        'background-2': '#E4CDB4', //light brown
        'foreground-1': '#693B18', //dark brown
        'foreground-2': '#59745D', //dark green
        'accent-1' : '#FDB2BA',
      },
      fontFamily: {
        'custom-title': ['Montserrat']
      }
    }
  },
  plugins: [],
}



export default withMT(config)
