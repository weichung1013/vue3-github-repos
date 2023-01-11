<template>
  <div class="page-header">
    <img
      class="avatar-pic"
      :src="
        userData && userData.login
          ? userData.avatar_url
          : 'https://avatars.githubusercontent.com/u/66003302?v=4'
      "
    />
    <div class="page-title">
      {{
        userData && userData.login
          ? userData.login[0].toUpperCase() + userData.login.substring(1) + "'s"
          : "My"
      }}
      GitHub Repositories
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted, watch } from "vue";
export default {
  name: "layout-header",
  props: ["user"],
  setup(props) {
    const userData = ref(null);

    const unwatchRepos = watch(
      () => props.user,
      (newUser) => {
        userData.value = newUser && newUser;
      },
      { deep: true }
    );

    onUnmounted(() => {
      unwatchRepos;
    });

    return {
      userData,
    };
  },
};
</script>
