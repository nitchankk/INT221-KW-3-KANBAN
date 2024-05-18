import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/task',
    name: "taskView",
    component: () => import('./components/TaskList.vue')
  },
  {
    path: '/task/:taskId',
    name: "taskDetail",
    component: () => import('./components/TaskList.vue')
  },
  {
    path: '/status',
    name: "statusView",
    component: () => import('./v2/StatusList.vue')
  },
  {
    path: '/status/:statusId',
    name: "statusDetail",
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
