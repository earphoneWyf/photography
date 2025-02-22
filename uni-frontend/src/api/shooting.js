import service from "./index";

// 获取全部约拍信息
export const getAllShootingDemandsApi = () => {
  return service.get("/shooting/demands");
};

// 根据约拍的 id 获取某一个约拍的信息
export const getShootingDemandByIdApi = (id) => {
  return service.get(`/shooting/demands/${id}`);
};

// 更新约拍的内容
export const updateShootingDemandApi = (id, data) => {
  return service.put(`/shooting/demands/${id}`, data);
};

// 发布约拍
export const publishShootingDemandApi = (data) => {
  return service.post("/shooting/demands", data);
};

// 根据用户 ID 获取该用户的所有约拍信息
export const getShootingDemandsByUserIdApi = (userId) => {
  return service.get(`/shooting/demands/user/${userId}`);
};
