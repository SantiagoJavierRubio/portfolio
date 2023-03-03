/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}'
  ],
  theme: {
    backgroundSize: {
      150: '150%',
      200: '200%'
    },
    extend: {
      keyframes: {
        'background-pan': {
          from: {
            'background-position': '0% center'
          },
          to: { 'background-position': '-200% center' }
        },
        'cross-through': {
          from: {
            'background-position': '-200% center'
          },
          to: {
            'background-position': '200% center'
          }
        }
      },
      animation: {
        appearBottom: 'appear-bottom 1s ease-in-out',
        appearLeft: 'appear-left 1s ease-in-out',
        backgroundPan: 'background-pan 1s linear infinite',
        backgroundSlowPan: 'background-pan 3.5s linear infinite',
        crossThrough: 'cross-through 60s linear alternate infinite'
      }
    }
  },
  variants: {
    extend: {
      animation: ['group-hover']
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
