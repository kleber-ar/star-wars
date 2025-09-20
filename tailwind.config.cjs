/** @type {import('tailwindcss').Config} */
module.export = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#25262B", // fundo principal
          secondary: "#373A40", // fundo secundário
          yellow: "#FCC419", // cor de destaque
        },
      },
    },
  },
  plugins: [],
};
