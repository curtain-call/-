import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './Welcome.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './assets/main.css'


import './styles/element-variables.scss'

import '@/styles/index.scss' // global css


const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
