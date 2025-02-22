import axios from "axios";
import { baseURL, timeout, adapter } from "@/config/index";

// 创建 axios 实例
const service = axios.create({
  baseURL,
  timeout,
  adapter,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头，例如 token
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      uni.showToast({
        title: res.message || "请求出错",
        icon: "none",
      });
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error);
    uni.showToast({
      title: error.message,
      icon: "none",
    });
    return Promise.reject(error);
  }
);

export default service;
