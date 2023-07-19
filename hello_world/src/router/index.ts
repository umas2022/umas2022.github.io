import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeIndex from "../views/HomeIndex.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeIndex,
    children: [{
      path: "/loading",
      name: "loading",
      component: () => import("../views/PageLoading.vue")
    }, 
    {
      path: "",
      alias: "/search",
      name: "search",
      component: () => import("../views/PageSearch.vue")
    },
    {
      path: '/show',
      name: 'show',
      component: () => import("../views/PageShow.vue")
    }    ,
    {
      path: '/dev',
      name: 'dev',
      component: () => import("../views/PageDev.vue")
    }
  ]
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // hash路由，解决show页刷新404
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
