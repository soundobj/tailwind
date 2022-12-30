/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg) scale(1)",
          },
          "50%": {
            transform: "rotate(3deg) scale(1.2)",
          },
        },
      },
      animation: {
        wiggle: "wiggle .3s ease-in-out",
      },
    },
  },
  plugins: [],
  "tailwindCSS.includeLanguages": {
    "plaintext": "javascript"
  }
}