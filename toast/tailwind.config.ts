import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lifetime : {
          "0%": {width:"100%"},
          "100%": {width:"0%"}
        },
      },
      animation: {
        lifetime: "lifetime 3s linear forwards"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        ".animation-p":{
          animationPlayState:"paused"
        }
      })
    })
  ],
} satisfies Config;
