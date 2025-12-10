import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import App from './App.vue'
import { useMarkStore } from './stores/marks'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

// ⬇ 关键一步：初始化 storage 数据（不要漏掉）
const markStore = useMarkStore()
markStore.init()