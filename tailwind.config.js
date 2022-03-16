module.exports = {
  content: ["./src/**/*.{html,js}", "*.{html,js}", "./js/**/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
    },
    extend: {
      colors: {
        red: {
          850: "#dc0d2e",
          950: "#c70724",
        },
        yellow: {
          450: "#f1f2d3",
        },
        green: {
          250: "#55ab62",
        },
      },
    },
  },
  plugins: [],
};
