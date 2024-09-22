import { createApp } from 'vue'
import './assets/base.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
// 使用插件
dayjs.extend(localizedFormat)
dayjs.locale('zh-cn')

const pinia = createPinia()
const app = createApp(App)

// 将 dayjs 挂载到全局属性中
app.provide('dayjs', dayjs)
app.use(pinia)
app.mount('#app')
