/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#011627',
        'secondary': '#011221',
        'border': '#1E2D3D',
        'text': '#607B96',
        'text-light': '#E5E9F0',
        'bg': '#000000',
        'container': '#011627',
        'bg-light': '#1E2D3D',
        'purple': '#4D5BCE',
        'orange': '#FEA55F',
        'green': '#43D9AD',
      },
      fontFamily: {
        'fira': ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}

