import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/abort",
    name: "Abort",
    component: () => import("@/pages/Abort.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
