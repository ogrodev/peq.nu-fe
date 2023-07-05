import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        expletus: ["var(--expletus-sans)", "sans-serif"],
        poppins: ["var(--poppins)", "sans-serif"],
      },
      colors: {
        background: "rgb(5 61 56)",
        text: "rgb(233 233 233)",
        primary: "rgb(242 104 0)",
        secondary: "rgb(163 204 171)",
        dark: "rgb(20 20 15)",
      },
      keyframes: {
        move: {
          "0% , 5%": {
            left: "-32px",
            width: "16px",
          },
          "15% , 20%": {
            left: "-32px",
            width: "48px",
          },
          "30% , 35%": {
            left: "0px",
            width: "16px",
          },
          "45% , 50%": {
            left: "0px",
            width: "48px",
          },
          "60% , 65%": {
            left: "32px",
            width: "16px",
          },
          "75% , 80%": {
            left: "32px",
            width: "48px",
          },
          "95%, 100% ": {
            left: "64px",
            width: "16px",
          },
        },
      },
      animation: {
        move: "move 3s linear infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
