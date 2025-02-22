const express = require("express");
const router = express.Router();
const {
  getAllSamplePhotos,
  getSamplePhotoById,
  updateSamplePhoto,
  publishSamplePhoto,
  getSamplePhotosByUserId,
} = require("../router_handler/sample");

// 获取全部样片信息
router.get("/photos", getAllSamplePhotos);
// 根据样片的 id 获取某一个样片的信息
router.get("/photos/:id", getSamplePhotoById);
// 更新样片的内容
router.put("/photos/:id", updateSamplePhoto);
// 发布样片
router.post("/photos", publishSamplePhoto);
// 根据用户 ID 获取该用户的所有样片信息
router.get("/photos/user/:userId", getSamplePhotosByUserId);

module.exports = router;
