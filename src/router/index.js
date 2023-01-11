import { createRouter, createWebHistory } from "vue-router";
import RepoList from "@/views/repo-list/RepoList.vue";

const routes = [
  {
    path: "/",
    name: "repo-list",
    component: RepoList,
    meta: {
      requiresAuth: false,
    },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("github-token")) {
      next();
    } else {
      next({ name: "repo-list" });
    }
  } else {
    // does not require auth
    next();
  }
});

export default router;
