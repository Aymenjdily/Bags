import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        beigeColor: "#FFF6E2",
        greenColor: "#d8f5c7",
        orangeColor: "#ffe3ba",
        redColor: "#f33d58"
      }
    },
  },
  plugins: [require("daisyui")],
}
export default config
