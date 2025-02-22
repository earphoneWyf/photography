import { defineStore } from "pinia";

import { getAllSamplePhotosApi } from "@/api/sample";

export const useSampleStore = defineStore("sample", {
  state: () => ({
    samples: [],
  }),
  actions: {
    async fetchAllSamples() {
      try {
        const response = await getAllSamplePhotosApi();
        if (response.code === 200) {
          this.samples = response.data;
        } else {
          uni.showToast({ title: response.message, icon: "none" });
        }
      } catch (error) {
        console.error(error);
        uni.showToast({ title: "获取约拍信息失败", icon: "none" });
      }
    },
  },
  onStoreSetup() {
    this.fetchAllSamples();
  },
});
