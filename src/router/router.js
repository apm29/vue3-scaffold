import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
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

  //匹配所有内容
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

//全局路由守卫
router.beforeEach((to, from) => {
  NProgress.start();
  return true;
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
