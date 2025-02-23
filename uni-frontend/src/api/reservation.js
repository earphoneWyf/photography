import service from "./index";

// 发起预约
export const initiateReservationApi = (data) => {
  return service.post("/reservation/addReservation", data);
};

// 编辑预约（修改是否同意的状态）
export const editReservationApi = (id, data) => {
  return service.put(`/reservation/editReservations/${id}`, data);
};

// 根据用户 id 获取预约数据
export const getReservationsByUserIdApi = (userId) => {
  return service.get(`/reservation/getReservations/${userId}`);
};

// 删除预约
export const deleteReservationApi = (id) => {
  return service.delete(`/reservation/delReservation/${id}`);
};

// 编辑预约的内容
export const editReservationContentApi = (id, data) => {
  return service.put(`/reservation/editReservationContent/${id}`, data);
};

// 根据发起者 id 和接收者 id 来判断两者是否有预约
export const checkReservationStatusApi = (initiatorId, receiverId) => {
  return service.get(`/reservation/checkReservationStatus/${initiatorId}/${receiverId}`);
};
