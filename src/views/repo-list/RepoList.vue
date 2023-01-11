<template>
  <div class="page-wrap" ref="repoList">
    <div class="repo-wrap" v-for="repo in repos" :key="repo.id">
      <div class="repo-title">{{ repo.name }}</div>
      <div class="repo-desc">{{ repo.description }}</div>
      <a class="repo-link" :href="repo.html_url" target="_blank">{{
        repo.html_url
      }}</a>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { watch, ref, onMounted, onUnmounted } from "vue";
import { useRepoStore } from "@/stores/RepoStore.js";
import { GeneralErrorHandler } from "@/services/errorService.js";
import { message } from "ant-design-vue";

export default {
  name: "repos-list",
  components: {},
  props: ["user"],
  emits: [],
  setup(props) {
    const repoList = ref(null);
    const userData = ref(null);
    const repos = ref([]);
    const RepoStore = useRepoStore();

    // loading
    const loading = ref(false);

    // fetch data
    const initPage = async () => {
      try {
        await RepoStore.getRepos();
      } catch (error) {
        const ErrorHandler = new GeneralErrorHandler(
          "load repositories",
          error
        );
        message.error(ErrorHandler.setErrorMsg(), 5);
      }
      repos.value = RepoStore.repos;
    };

    // pagination
    let currentPage = 1;
    const totalData = ref(0);
    const getNewPage = _.debounce(async () => {
      if (currentPage * RepoStore.perPage < totalData.value) {
        currentPage++;
        try {
          await RepoStore.$patch({
            currentPage: currentPage,
          });
          await RepoStore.getRepos();
        } catch (error) {
          const ErrorHandler = new GeneralErrorHandler(
            "load repositories",
            error
          );
          message.error(ErrorHandler.setErrorMsg(), 5);
        }
      }
    }, 300);

    // scrolling
    const handleScrolling = () => {
      let list = repoList.value;
      // load more if scroll reach the top of last loaded repo
      if (list.scrollTop + list.clientHeight + 120 >= list.scrollHeight) {
        getNewPage();
      }
    };

    onMounted(async () => {
      userData.value = props.user;
      totalData.value = props.user ? props.user.public_repos : 0;
      await initPage();
      repoList.value.addEventListener("scroll", handleScrolling);
    });

    const unwatchLoading = watch(
      () => RepoStore.loading,
      (val) => {
        loading.value = val;
        val
          ? repoList.value.classList.add("fade")
          : repoList.value.classList.remove("fade");
      }
    );

    const unwatchRepos = watch(
      () => RepoStore.repos,
      (newRepos) => {
        repos.value = newRepos;
      },
      { deep: true }
    );

    const unwatchUser = watch(
      () => props.user,
      (newUser) => {
        userData.value = newUser;
        totalData.value = newUser ? newUser.public_repos : 0;
      },
      { deep: true }
    );

    onUnmounted(() => {
      repoList.value.removeEventListener("scroll", handleScrolling);
      unwatchLoading;
      unwatchRepos;
      unwatchUser;
    });

    return {
      loading,
      userData,
      repos,
      repoList,
    };
  },
};
</script>
