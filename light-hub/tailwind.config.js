import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-bevan)"],
        title2: ["var(--font-francois_one)"],
        mono: ["var(--font-lora)"],
        display: ["var(--font-calsans)"],
      },
      animation: {
        "fade-in": "fade-in 3s ease-in-out forwards",
        title: "title 6s ease-out forwards",
        "fade-left": "fade-left 3s ease-in-out forwards",
        "enter-right": "enter-right 3s ease-in-out forwards",
        "fade-right": "fade-right 3s ease-in-out forwards",
        "enter-line": "fade-in 3s ease-in-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "enter-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "80%",
          },
          "80%": {
            opacity: "40%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0%",
          },
          "80%": {
            opacity: "100%",
          },

          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#F5F5F5",
            foreground: "#2e2b22",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#000000",
            foreground: "#F5F5F5",
          },
        },
      },
    }),
  ],
};
