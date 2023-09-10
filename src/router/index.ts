import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.title = to.meta.title || "iLink - Кабинет";
  if (to.meta.requiresAuth) {
    const token = store.state.token;
    if (!token) next({ name: "auth.login" });
  }
  next();
});

export default router;
