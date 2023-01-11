import { defineStore } from "pinia";
import { getService } from "@/services/requestService.js";

export const useUserStore = defineStore({
  id: "UserStore",
  state: () => ({
    user: "weichung1013",
    userData: null,
  }),
  actions: {
    async getUser() {
      const res = await getService(`${this.user}`);
      this.userData = res;
    },
  },
});
