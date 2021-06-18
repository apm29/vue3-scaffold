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
    proxy: {
      "/testApi": {
        target: "http://ebasetest2.ciih.net",
        changeOrigin: true,
        pathRewrite: {
          "^/testApi": "",
        },
      },
    },
  },
  configureWebpack: {
    name: "Vue3基础模板",
  },
};
