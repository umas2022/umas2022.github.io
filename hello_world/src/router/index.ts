import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeIndex from "../views/HomeIndex.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeIndex,
    children: [{
      path: "/loading",
      name: "loading",
      component: () => import("../views/LoadingPage.vue")
    },{
      path: "",
      alias: "/search",
      name: "search",
      component: () => import("../views/SearchTag.vue")
    },
    {
      path: '/show',
      name: 'show',
      component: () => import("../views/ShowGroup.vue")
    }]
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
