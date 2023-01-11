import { describe, it, expect, beforeAll, vi } from "vitest";

import { mount, flushPromises } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRepoStore } from "@/stores/RepoStore.js";
import RepoList from "@/views/repo-list/RepoList.vue";

describe("RepoList", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(RepoList, {
      props: { user: null },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });
  });

  it("renders properly", () => {
    expect(wrapper).toBeTruthy();
  });

  it("loads data from store", async () => {
    const store = useRepoStore();
    const fakeData = [
      {
        id: 10001,
        name: "dummy data 01",
      },
      {
        id: 10002,
        name: "dummy data 02",
      },
      {
        id: 10003,
        name: "dummy data 03",
      },
      {
        id: 10004,
        name: "dummy data 04",
      },
      {
        id: 10005,
        name: "dummy data 05",
      },
      {
        id: 10006,
        name: "dummy data 06",
      },
    ];
    store.$patch({ repos: fakeData });
    await flushPromises();
    expect(wrapper.vm.repos.length).toEqual(6);
  });

  it("triggers to load new page in store", async () => {
    const store = useRepoStore();
    wrapper.vm.getNewPage;
    await flushPromises();
    expect(store.getRepos).toHaveBeenCalledTimes(1);
  });
});
