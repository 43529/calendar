import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
