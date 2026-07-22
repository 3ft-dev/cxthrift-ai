/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14151A",
        inksoft: "#5B5E6B",
        line: "#E4E7ED",
        cloud: "#FAFAFC",
        blue: "#0A5CFF",
        bluedeep: "#0A3FB0",
        teal: "#0CBDD1",
        tealight: "#13C5D6",
        pink: "#FF4D8D",
        amber: "#FFA53C",
        navy: "#0A2A5E",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        card: "20px",
        lg2: "24px",
      },
      boxShadow: {
        grad: "0 8px 24px rgba(10,92,255,.22)",
      },
    },
  },
  plugins: [],
};
