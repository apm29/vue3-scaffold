import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home"),
  },
  {
    path: "/abort",
    name: "Abort",
    component: () => import("@/pages/Abort"),
  },

  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/errors/404"),
    props: (route) => ({
      path: route.path,
    }),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
