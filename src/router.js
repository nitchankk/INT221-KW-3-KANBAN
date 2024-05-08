import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import Test.vue
import Test from './components/test/Test.vue'
import StatusTable from './v2/StatusList.vue'

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
    component: StatusTable // Add a route for StatusTable.vue
  },
  {
    path: '/',
    redirect: '/task',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
