import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta:{index:1,title: '天天记账-日常开支'},
    component: Home
  },
  {
    path: '/funnel',
    name: 'Funnel',
    // route level code-splitting
    // this generates a separate chunk (funnel.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{index:2,title: '天天记账-记账漏斗'},
    component: () => import(/* webpackChunkName: "funnel" */ '../views/Funnel.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{index:3,title: '天天记账-我的'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
  },
  {
    path: '/wishlist',
    name: 'WishList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{index:4,title: '天天记账-心愿清单'},
    component: () => import(/* webpackChunkName: "about" */ '../views/WishList.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
