### Vue3学习项目(兼作项目脚手架)

#### 1.生成Vite脚手架项目

看文档

#### 2.安装tailwindcss

* 安装依赖

```shell
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

* 生成配置文件 生成tailwind.config.js 和 postcss.config.js 文件

```shell
npx tailwindcss init -p
```

* 加固定前缀/加tree-shake,禁用样式预重置 tailwind.config.js文件:

```js
module.exports = {
  purge: ["src/**/*.vue"],
  prefix: "tw-",
  corePlugins: {
    preflight: false, //禁用preflight样式重置
  },
}
```

* 在css文件引入 index.css文件,然后在main.js引入该css文件

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 3.引入ui框架(vant3.0)

* 安装依赖

```shell
npm i vant@next -S
```

* 引入组件 使用vite-plugin-style-import按需引入
    * 引入vite-plugin-style-import插件
    ```shell
    npm i vite-plugin-style-import -D
    ```
    * 在vite.config.js配置
    > 没有的话创建一个,按ui框架文档书写配置
* 备选: 全局引入(不可与按需引入同时使用)

 ```js

import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp();
app.use(Vant);

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
