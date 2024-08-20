import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import TaskList from './components/TaskList.vue'
import StatusList from './v2/StatusList.vue'
import Login from './v3/Login.vue'

const routes = [
  {
    path: '/task',
    name: 'taskView',
    component: TaskList,
    meta: { requiresAuth: true }
  },
  {
    path: '/task/:taskId',
    name: 'taskDetail',
    component: TaskList,
    meta: { requiresAuth: true }
  },
  {
    path: '/status',
    name: 'statusView',
    component: StatusList,
    meta: { requiresAuth: true }
  },
  {
    path: '/status/:statusId',
    name: 'statusDetail',
    component: StatusList,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'loginView',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/task'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Add a navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
