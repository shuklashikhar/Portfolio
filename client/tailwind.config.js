/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-color': '#6366f1',
        'accent-1': '#8b5cf6',
        'accent-2': '#ec4899',
        'accent-3': '#f59e0b',
        'accent-4': '#10b981',
        'accent-5': '#3b82f6',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 5s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
