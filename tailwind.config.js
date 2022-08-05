const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "400%": "400%",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#F95045",
        secondary: "#1F1F23",
        shade: "#ededf4",
        accent: "#838efe",
        background: "#f3f5f7",
      },
      keyframes: (theme) => ({
        placeholder: {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
        bouncein: {
          "100%": { transform: "scale(1)" },
          "0%": { transform: "scale(0.9)" },
          "70%": { transform: "scale(0.95)" },
          "40%": { transform: "scale(1.05)" },
        },
        bounceout: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        heightin: {
          "0%": { transform: "scaleY(0)", "transform-origin": "top" },
          "100%": { transform: "scaleY(1)", "transform-origin": "top" },
        },
        slideinright: {
          "0%": { right: "-100%" },
          "100%": { right: "0px" },
        },
        slideoutright: {
          "0%": { right: "-100%" },
          "100%": { right: "0px" },
        },
        opacityin: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        opacityout: {
          "0%": {},
          "10%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      }),
      animation: {
        placeholder: "placeholder gradient 3s infinite",
        bouncein: "bouncein 0.3s ease-in-out",
        opacityin: "opacityin 0.2s ease-in-out",
        bounceout: "bounceout 0.3s ease-in-out",
        opacityout: "opacityout 1s",
        heightin: "heightin 0.3s ease-in-out",
        slideinright: "slideinright 0.2s",
        slideoutright: "slideoutright 0.1s",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities(
        {
          ".fadeout": {
            ".hidden": {
              visibility: "hidden",
              opacity: 0,
              transition: "visibility 0s 0.5s, opacity 0.5s linear",
            },
          },
          ".custom-scrollbar": {
            /* width */
            "::-webkit-scrollbar": {
              width: "16px",
              height: "16px",
            },

            /* Track */
            "::-webkit-scrollbar-track": {
              "border-radius": "100vh;",
              background: "#edf2f7",
            },

            /* Handle */
            "::-webkit-scrollbar-thumb": {
              background: "#cbd5e0",
              "border-radius": "100vh;",
              border: "3px solid #edf2f7",
            },

            /* Handle on hover */
            "::-webkit-scrollbar-thumb:hover": {
              background: "#a0aec0",
            },
          },
          ".scrollbar-hide": {
            /* IE and Edge */
            "-ms-overflow-style": "none",

            /* Firefox */
            "scrollbar-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          ".scrollbar-hide-x": {
            /* IE and Edge */
            "-ms-overflow-x-style": "none",

            /* Firefox */
            "scrollbar-x-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar-x": {
              display: "none",
            },
          },
          "clip-rect": {
            clip: "rect(auto, auto, 0, auto)",
          },
          ".scrollbar-default": {
            /* IE and Edge */
            "-ms-overflow-style": "auto",

            /* Firefox */
            "scrollbar-width": "auto",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "block",
            },
          },
        },
        ["responsive"]
      );
    }),
    // ...
    require("@tailwindcss/line-clamp"),
  ],
};
