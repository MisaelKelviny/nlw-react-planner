/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },
      backgroundImage: {
        pattern: "url('/bg.png')",
      },
    },
  },
  plugins: [],
};
