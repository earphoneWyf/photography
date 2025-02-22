import service from "./index";

// 注册接口
export const registerApi = (data) => {
  return service.post("/user/register", data);
};

// 登录接口
export const loginApi = (data) => {
  return service.post("/user/login", data);
};

// 根据用户 ID 获取用户信息
export const getUserInfoApi = (id) => {
  return service.get(`/user/info/${id}`);
};

// 更新用户信息
export const updateUserInfoApi = (data) => {
  return service.post("/user/update", data);
};

// 获取推荐的用户信息
export const getRecommendedUsersApi = () => {
  return service.get("/user/getRecommendedUsers");
};
