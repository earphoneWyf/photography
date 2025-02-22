import { defineStore } from "pinia";

import { getAllShootingDemandsApi } from "@/api/shooting";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointments: [],
  }),
  actions: {
    async fetchAllAppointments() {
      try {
        const response = await getAllShootingDemandsApi();
        if (response.code === 200) {
          this.appointments = response.data;
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
    this.fetchAllAppointments();
  },
});
