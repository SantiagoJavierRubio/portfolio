/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      animation: {
        appearBottom: 'appear-bottom 1s ease-in-out',
        appearLeft: 'appear-left 1s ease-in-out'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
