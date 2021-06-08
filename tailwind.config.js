const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["src/**/*.vue"],
  prefix: "tw-",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      gray: colors.gray,
      pink: colors.pink,
      purple: colors.purple,
      indigo: colors.indigo,
      yellow: colors.yellow,
      black: colors.black,
      white: colors.white,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      amber: colors.amber,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      rose: colors.rose,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true, //禁用preflight样式重置
  },
};
