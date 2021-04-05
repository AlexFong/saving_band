import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

import Home from '../views/Home.vue'

import { Toast } from 'vant';
Vue.use(Toast);

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
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{index:5,title: '天天记账-登录'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'Other',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // meta:{index:5,title: '天天记账-登录'},
    // component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    redirect: '/',
  },
]

let router = new VueRouter({
  routes
})

// let token = false;
// if(localStorage.token) {
//   token = localStorage.token;
//   // token更新可能会导致拦截失效
//   window.token = localStorage.token;
//   window.loginStatus = true;
// }
// else {
//   window.token = false;
//   window.loginStatus = false;
// }
// console.log('router index.ts',window.token,window.loginStatus);


console.log('设置全局前置守卫');

// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('设置全局前置守卫to',to);
  console.log('from',from);
  if(!localStorage.token && to.fullPath != '/login') {
    next('/login');
  }else if(localStorage.token && to.fullPath == '/login'){
    Toast("用户已登录")
    next('/home');
  }else{
    next();
  }
})

export default router
