import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store/store'
import '@/index.css'

//App实例,用于挂载自定义组件/自定义指令等
createApp(App)
   .use(store)
   .mount('#app')
