/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Slate 900
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Indigo 500
          600: '#4f46e5',
          700: '#4338ca',
        },
        accent: {
          500: '#8b5cf6', // Violet 500
          600: '#7c3aed',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': 'left center' },
          '50%': { 'background-position': 'right center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
