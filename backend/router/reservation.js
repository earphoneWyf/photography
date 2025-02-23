const express = require("express");
const router = express.Router();
const {
  initiateReservation,
  editReservation,
  getReservationsByUserId,
  deleteReservation,
  editReservationContent,
  checkReservationStatus
} = require("../router_handler/reservation");

// 发起预约
router.post("/addReservation", initiateReservation);

// 编辑预约（修改是否同意的状态）
router.put("/editReservations/:id", editReservation);

// 根据用户 id 获取预约数据
router.get("/getReservations/:userId", getReservationsByUserId);

// 删除预约
router.delete("/delReservation/:id", deleteReservation);

// 编辑预约的内容
router.put("/editReservationContent/:id", editReservationContent);

// 根据发起者 id 和接收者 id 来判断两者是否有预约
router.get("/checkReservationStatus/:initiatorId/:receiverId", checkReservationStatus);

module.exports = router;
