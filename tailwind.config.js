/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evo: {
          black: "#050812",
          navy: "#091426",
          cyan: "#42EAFF",
          violet: "#987BFF",
          silver: "#C4D1DF",
          turquoise: "#2EE5D4",
          amber: "#FFB347",
          emerald: "#00F5A0",
          white: "#F3F5F9",
          muted: "#8899A6",
          dim: "#546575"
        }
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
}
