/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0b0f19',
          800: '#111827',
          700: '#1f2937'
        },
        neon: {
          cyan: '#00f0ff',
          purple: '#b026ff',
          green: '#00ff66'
        }
      }
    },
  },
  plugins: [],
}
