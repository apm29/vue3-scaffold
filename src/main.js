import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

//为了方便全部引入了
import Vant from 'vant';
import 'vant/lib/index.css';

//App实例,用于挂载自定义组件/自定义指令等
let app = createApp(App)
app.use(Vant)
//根Vue实例
let vm = app.mount('#app')

export default app;
