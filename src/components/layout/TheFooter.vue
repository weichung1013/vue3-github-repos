<template>
  <div class="page-footer">
    <ScrollDownIcon
      style="height: 100px; width: 550px"
      v-if="showData < totalData"
    />
    <ViewAllIcon style="height: 100px; width: 550px" v-else />
    <div class="footer-counter">
      Currently Show Repositories: {{ showData }}/{{ totalData }}
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted, onUnmounted } from "vue";
import { useRepoStore } from "@/stores/RepoStore.js";

import ViewAllIcon from "@/components/icons/IconViewAll.vue";
import ScrollDownIcon from "@/components/icons/IconScrollDown.vue";

export default {
  name: "layout-footer",
  props: ["user"],
  components: {
    ViewAllIcon,
    ScrollDownIcon,
  },
  setup(props) {
    const showData = ref(0);
    const totalData = ref(0);

    const RepoStore = useRepoStore();

    onMounted(async () => {
      totalData.value = props.user ? props.user.public_repos : 0;
      showData.value = RepoStore.repos.length;
    });

    const unwatchUser = watch(
      () => props.user,
      (newUser) => {
        totalData.value = newUser ? newUser.public_repos : 0;
      },
      { deep: true }
    );

    const unwatchRepos = watch(
      () => RepoStore.repos,
      (newRepos) => {
        showData.value = newRepos.length;
      },
      { deep: true }
    );

    onUnmounted(() => {
      unwatchUser;
      unwatchRepos;
    });

    return {
      showData,
      totalData,
    };
  },
};
</script>
