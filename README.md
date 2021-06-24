### Vue3学习项目(兼作项目脚手架)


#### 1.生成Vite脚手架项目
看文档
```shell
yarn create @vitejs/app <project-name>
```
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



#### 加入工具类
* 引入jsconfig.json, 别名配置
```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./",
        "paths": {
          "@/*": ["src/*"]
        }
    },
    "exclude": [
        "node_modules"
    ],
    "include": [
        "./src/**/*"
    ]
}
```
* 改造request.js
> 将配置config store 放在同一个文件内导出


#### 3.添加ui框架vuetify
```shell
vue add vuetify
```
选择Preview (Vuetify 3 + Vite)



#### 4.添加ESLint

vue-cli命令行添加eslint,选择喜欢的配置: 我是prettier + lint on save
```shell
vue add eslint
```
> `Webstorm` 需要在设置中Language And Framework -> JavaScript -> Prettier 配置save时lint


