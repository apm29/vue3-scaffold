import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: { "process.env": {} },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
    port: 3399,
    proxy: {
      // 字符串简写写法
      //"/foo": "http://localhost:4567/foo",
      // 选项写法
      // "/testApi": {
      //   target: "http://ebasetest.ciih.net",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/testApi/, ""),
      // },
      // 正则表达式写法
      "^/testApi/.*": {
        target: "http://ebasetest2.ciih.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/testApi/, ""),
      },
    },
  },
});

console.log(resolve(__dirname, "src"));
