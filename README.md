### Vue3学习项目(兼作项目脚手架)

#### 1.生成vue3脚手架
```shell
vue create vue3-scalffold
```
选择vue3-preview预设配置


#### 2.添加vuetify3依赖

```shell
vue add vuetify
```
选择V3(alpha)预设配置i

#### 2.安装tailwindcss
* 安装依赖
```shell
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
* 生成配置文件
  生成tailwind.config.js 和 postcss.config.js 文件
```shell
npx tailwindcss init -p
```
* 加固定前缀/加tree-shake,禁用样式预重置
  tailwind.config.js文件:
```js
module.exports = {
  purge: ["src/**/*.vue"],
  prefix: "tw-",
  corePlugins: {
    preflight: false, //禁用preflight样式重置
  },
}
```

* 在css文件引入
  index.css文件,然后在main.js引入该css文件
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

