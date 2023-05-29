import { createRouter, createWebHistory } from 'vue-router'
import Parser from '../views/ResumeParser/index.vue'
import Login from '../views/Login/index.vue'
import Homepage from '../views/Homepage/index.vue'
import Register from '../views/Register/index.vue'
import ForgetPassword from '../views/ForgetPassword/index.vue'
import Layout from '../layout/index.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword
    }
  ]
})

export default router
