import { createApp } from 'vue'
import pinia from './stores'

import App from './Welcome.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '../mock/index'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import axios from 'axios'
import '@/permission' // permission control

const app = createApp(App)

// app.use(createPinia())
app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')

// while(true){
//     console.log("sending request")
//     axios.post('http://192.168.159.1:5168/api/Login/Login',{username: 'admin', password: '123456'},{
//     withCredentials: true
// })
// }

