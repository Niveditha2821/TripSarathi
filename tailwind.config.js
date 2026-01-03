/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        in: 'fadeIn 0.3s ease-in-out',
        slideInFromBottom: 'slideInFromBottom 0.4s ease-out',
        slideInFromBottomLg: 'slideInFromBottom 0.4s ease-out',
      },
      keyframes: {
        slideInFromBottom: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      colors: {
        primary: '#2563eb',
        secondary: '#22c55e',
      },
    },
  },
  plugins: [],
}
