import { createRouter, createWebHistory } from 'vue-router'
import Parser from '../views/ResumeParser/index.vue'
import Login from '../views/Login/index.vue'
import Homepage from '../views/Homepage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    }
  ]
})

export default router
