import { defineStore } from "pinia";
import { getService } from "@/services/requestService.js";

export const useRepoStore = defineStore({
  id: "RepoStore",
  state: () => ({
    // user: 'weichung1013',
    user: "weichung1013",
    currentPage: 1,
    perPage: 6,
    total: 0,
    repoMap: {},
    repos: [],
    loading: false,
  }),
  actions: {
    async getRepos() {
      this.loading = true;
      const res = await getService(`${this.user}/repos`, "pagination", [
        this.perPage,
        this.currentPage,
      ]);
      this.repoMap[this.currentPage] = res;
      this.repos = Object.values(this.repoMap)
        .map((e) => e)
        .flat(1);
      this.total = this.repos.length;
      this.loading = false;
    },
  },
});
