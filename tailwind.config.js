/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkblue': '#4F597E',
        'salmon': '#F1A095',
        'lightblue': '#98E1EE',
        'purple': '#8980F0',
        'lightgrey': '#BDBEC2',
        'background': '#F5F6FA',
        'dark': '#2C2F3A',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
    fontSize: {
      sm: '0.75rem',
      md: '0.85rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },

  },
  plugins: [],
}

