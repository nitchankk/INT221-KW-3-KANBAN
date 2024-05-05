import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import Test.vue
import Test from './components/test/Test.vue'

const routes = [
  {
    path: '/task',
    component: () => import('./components/TaskList.vue')
  },
  {
    path: '/task/:taskId',
    component:() => import('./components/TaskList.vue')
  },
  {
    path: '/test',
    component: Test
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
