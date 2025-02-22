// 导入创建 SSR 应用的函数
import { createSSRApp } from "vue";
// 导入根组件
import App from "./App.vue";

// 导入 uView 库
import uviewPlus from "uview-plus";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 导出创建应用的函数
export function createApp() {
  // 创建应用实例
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  app.use(uviewPlus);
  app.use(pinia);

  return {
    app,
  };
}
