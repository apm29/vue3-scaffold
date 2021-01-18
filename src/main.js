import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

//App实例,用于挂载自定义组件/自定义指令等
let app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

//根Vue实例
let vm = app.mount('#app')
