/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8f5ee",
        ink: "#26372d",
        green: "#344c3d",
        sage: "#dce4d7",
        clay: "#dca18a",
        gold: "#e9c66c",
        border: "#e3ded2",
      },
      fontFamily: {
        body: ["Arial", "Helvetica", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 12px 35px rgb(38 55 45 / 8%)",
      },
    },
  },
  plugins: [],
};
