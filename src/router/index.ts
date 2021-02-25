import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/funnel',
    name: 'Funnel',
    // route level code-splitting
    // this generates a separate chunk (funnel.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "funnel" */ '../views/Funnel.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
  },
  {
    path: '/wishlist',
    name: 'WishList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WishList.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
