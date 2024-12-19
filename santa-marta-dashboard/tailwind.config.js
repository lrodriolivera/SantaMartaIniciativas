/** tailwind.config.js */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003B70', // Azul oscuro
        secondary: '#B8860B', // Amarillo
        white: '#FFFFFF',
        grayLight: '#F4F4F4',
      },
    },
  },
  plugins: [],
};
