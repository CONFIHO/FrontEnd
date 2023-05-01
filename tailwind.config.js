/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: "#5703C1",
        purple_dark: "#240951",
        purple2: "#5107AF",
        gray: '#CECECE'
      },
      fontSize: {
        8: ["0.5rem", "1rem"],
        10: ["0.625rem", "1rem"],
        11: ["0.6875rem", "1rem"],
        12: ["0.75rem", "1rem"],
        14: ["0.875rem", "1.25rem"],
        15: ["0.9375rem", "1.25rem"],
        16: ["1rem", "1.5rem"],
        18: ["1.125rem", "1.75rem"],
        20: ["1.25rem", "1.75rem"],
        21: ["1.3125rem", "1.75rem"],
        24: ["1.5rem", "2rem"],
        28: ["1.75rem", "2.25rem"],
        30: ["1.875rem", "2.25rem"],
        36: ["2.25rem", "2.5rem"],
        48: ["3rem", "1"],
        60: ["3.75rem", "1"],
        64: ["4rem", "1"],
        72: ["4.5rem", "1"],
        96: ["6rem", "1"],
        128: ["8rem", "1"],
      },
    },
  },
  plugins: [],
};
