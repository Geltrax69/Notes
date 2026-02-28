/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        "background-light": "#F8F8F5", // Paper color
        "background-dark": "#0a0a0a",  // True dark
        "card-light": "#ffffff",       // Pure white cards
        "card-dark": "#161616",
        "accent-pink": "#FF3366",      // Neon pink
        "accent-orange": "#FF4D00",    // Safety orange
        "accent-purple": "#7000FF",    // Deep violet
        "accent-green": "#00E55A",     // Matrix green
        "accent-blue": "#0033FF",      // Yves Klein blue
        "accent-yellow": "#FFEA00",    // Highlighter yellow
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        'xl': "0px",
        '2xl': "0px",
        '3xl': "0px",
        'full': "9999px",
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(15,15,15,1)',
        'brutal-dark': '4px 4px 0px 0px rgba(248,248,245,1)',
      }
    },
  },
  plugins: [],
}
