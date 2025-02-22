import { defineConfig } from "vite";
import { resolve } from "path";
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        // additionalData: '@import "@/static/style/mixin.scss";',
      },
    },
  },
  // 开发服务器配置
  server: {
    open: true,
    proxy: {
      // 去掉 /api 前缀，直接代理所有请求到后端服务器
      "/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
