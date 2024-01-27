const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{tsx,svg,json}"
  ],
  darkMode: 'class',
  // Theme
  theme: {
    fontFamily: {
      sans: ['ibm-plex-sans', ...defaultTheme.fontFamily.sans],
      serif: ['ibm-plex-serif', ...defaultTheme.fontFamily.sans],
      mono: ['ibm-plex-mono', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        black: '#111010',
        white: '#f9f9f9'
      }
    }
  }
}
