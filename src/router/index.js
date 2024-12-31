import { createRouter, createWebHistory } from "vue-router";
import ChartPage from "../views/ChartPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ChartPage",
      component: ChartPage,
    },
    {
      path: "/testPage",
      name: "TestPage",
      component: () => import("../views/TestPage.vue"),
    },
  ],
});

export default router;