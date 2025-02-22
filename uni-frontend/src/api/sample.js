import service from "./index";

// 获取全部样片信息
export const getAllSamplePhotosApi = () => {
  return service.get("/sample/photos");
};

// 根据样片的 id 获取某一个样片的信息
export const getSamplePhotoByIdApi = (id) => {
  return service.get(`/sample/photos/${id}`);
};

// 更新样片的内容
export const updateSamplePhotoApi = (id, data) => {
  return service.put(`/sample/photos/${id}`, data);
};

// 发布样片
export const publishSamplePhotoApi = (data) => {
  return service.post("/sample/photos", data);
};

// 根据用户 ID 获取该用户的所有样片信息
export const getSamplePhotosByUserIdApi = (userId) => {
  return service.get(`/sample/photos/user/${userId}`);
};
