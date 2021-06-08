const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  outputDir: "dist",
  assetsDir: "assets",
  publicPath: "./",
  devServer: {
    port: 59638,
    open: true,
    host: "0.0.0.0",
    https: false,
    hotOnly: false,
  },
  configureWebpack: {
    name: "Vue3基础模板",
    context: path.resolve(__dirname, "./"),
    //别名配置
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
};
