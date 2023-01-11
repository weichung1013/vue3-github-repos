<template>
  <basic-layout :user="user" />
</template>

<script>
import { message } from "ant-design-vue";
import { watch, ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/UserStore.js";
import BasicLayout from "@/components/layout/TheBasicLayout.vue";

export default {
  name: "app",
  components: { BasicLayout },
  setup() {
    const appVersion = ref("0.0.0");
    const user = ref({
      login: "my",
      avatar_url: "https://avatars.githubusercontent.com/u/66003302?v=4",
    });
    const UserStore = useUserStore();

    const unwatchRepos = watch(
      () => UserStore.userData,
      (data) => {
        user.value = data && data;
      },
      { deep: true }
    );

    onMounted(async () => {
      appVersion.value = import.meta.env.VITE_APP_VERSION;
      await UserStore.getUser();
    });

    onUnmounted(() => {
      unwatchRepos;
    });
    return {
      message,
      appVersion,
      user,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_main.scss";
</style>
