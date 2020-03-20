import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    meta: { title: "首页" },
    component: Home
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "关于" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/About.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue")
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue")
  }
];

const router = new VueRouter({
  routes: routes
});

export default router;
