const express = require("express");
const router = express.Router();
const {
  getAllCarousels,
  addCarousel,
  deleteCarousel,
  updateCarouselDisplayStatus,
  getVerifiedCarousels,
} = require("../router_handler/carousel");

// 获取全部轮播图信息
router.get("/getAllCarousels", getAllCarousels);

// 新增轮播图
router.post("/addCarousel", addCarousel);

// 删除轮播图
router.delete("/deleteCarousel/:id", deleteCarousel);

// 根据 ID 修改是否呈现的字段
router.put("/updateStatus", updateCarouselDisplayStatus);

router.get('/getVerifiedCarousels', getVerifiedCarousels)

module.exports = router;
