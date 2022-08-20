/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#E63E44",
          secondary: "#808080",
          accent: "#D54F48",
          neutral: "#E9E9E9",
          "base-100": "#FFFFFF"
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#E7444F",
          secondary: "#7C7C7C",
          accent: "#C0504F",
          neutral: "#464646",
          "base-100": "#1E1E1E"
        }
      }
    ]
  }
};
