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
        'darksalmon': '#C78379',
        'lightblue': '#98E1EE',
        'purple': '#8980F0',
        'lightpurple': '#E5E3FC',
        'lightgrey': '#BDBEC2',
        'darkgrey': '#747474',
        'background': '#F5F6FA',
        'dark': '#2C2F3A',
        'blue': '#4185F5',
        'darkblue': '#4F597E',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      dropShadow: {
        'box': '0 10px 10px rgba(117, 123, 183, .1)',
      }
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
      '9xl': '7.052rem',
    },

  },
  plugins: [],
}

