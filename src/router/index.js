import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'near',
        component: () => import('../views/Near.vue')
      },
      {
        path: 'busroutes',
        name: 'busroutes',
        component: () => import('../views/BusRoutes.vue')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('../views/News.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
