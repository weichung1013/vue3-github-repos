<template>
  <a-layout>
    <a-layout-header>
      <the-header :user="userData" />
    </a-layout-header>
    <a-layout-content>
      <router-view :user="userData"></router-view>
    </a-layout-content>
    <a-layout-footer style="max-height: 52px">
      <the-footer :user="userData" />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { RouterView } from "vue-router";
import { ref, onUnmounted, watch } from "vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default {
  name: "basic-layout",
  components: { TheHeader, TheFooter, RouterView },
  props: ["user"],
  // emits: ["logout", "onSwitchSite"],
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
