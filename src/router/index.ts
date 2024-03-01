import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlenderView from '../views/BlenderView.vue'
import BlenderView2 from '../views/BlenderView2.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blender1',
      name: 'blender1',
      component: BlenderView
    },
    {
      path: '/blender2',
      name: 'blender2',
      component: BlenderView2
    },
    {
      path: '/description',
      name: 'description',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: BlenderView2

      component: () => import('../views/DescriptionView.vue')
    }
  ]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
