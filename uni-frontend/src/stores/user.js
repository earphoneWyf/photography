import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    isAuthenticated: false,
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      this.isAuthenticated = true;
    },
    clearUserInfo() {
      this.userInfo = null;
      this.isAuthenticated = false;
    },
  },

  // 开启持久化
  persist: {
    storage: {
      getItem: (key) => uni.getStorageSync(key),
      setItem: (key, value) => uni.setStorageSync(key, value),
      removeItem: (key) => uni.removeStorageSync(key),
    },
  },
});
