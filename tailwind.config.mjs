export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      fontSize: generateSpacing(),
      colors: {
        publicGray: "#999999",
        publicOrange: "#FFBD00",
        publicBlack: "#000000",
        publicWhite: "#FFFFFF",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(-90deg, #FF9900, #FFBD00)",
      },
      height: generateSpacing(),
      width: generateSpacing(),
      spacing: generateSpacing(),
      borderWidth: {
        DEFAULT: "1px",
      },
      borderColor: {
        publicGray: "#DCDCDC",
        publicOrange: "#FFBD00",
      },
    },
  },
  plugins: [],
};

function generateSpacing() {
  let spacing = {};
  for (let i = 1; i <= 100; i++) {
    spacing[i] = `${i * 0.1}rem`;
  }
  return spacing;
}
