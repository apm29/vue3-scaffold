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
    chainWebpack: (config) => {
      config.resolve.alias.set("@", resolve("src"));
    },
  },
};
