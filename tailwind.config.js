/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coppel: {
          blue: '#0070c0',
          yellow: '#ffc107',
          gray: {
            light: '#f8f9fa',
            DEFAULT: '#6c757d',
            dark: '#343a40'
          }
        }
      }
    }
  },
  plugins: [],
}
