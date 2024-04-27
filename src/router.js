import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/task',component:()=> import('./components/TaskList.vue')
   
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
