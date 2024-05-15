import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/task',
    component: () => import('./components/TaskList.vue')
  },
  {
    path: '/task/:taskId',
    component: () => import('./components/TaskList.vue')
  },
  {
    path: '/test',
    component: () => import('./components/test/Test.vue')
  },
  {
    path: '/status',
    component: () => import('./v2/StatusList.vue')
  },
  {
    path: '/status/:statusId',
    component: () => import('./v2/StatusList.vue')
  },
  {
    path: '/',
    redirect: '/task',
    component: App
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
