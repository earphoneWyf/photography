const express = require("express");
const router = express.Router();
const {
  getAllInformations,
  addInformation,
  deleteInformation,
  updateInformationDisplayStatus,
  getDisplayedInformations,
} = require("../router_handler/information");

// 获取全部资讯信息
router.get("/all", getAllInformations);

// 新增资讯
router.post("/add", addInformation);

// 删除资讯
router.delete("/delete/:id", deleteInformation);

// 编辑资讯（编辑某个资讯的是否展示，is_displayed为1/0）
router.put("/updateStatus", updateInformationDisplayStatus);

// 获取is_displayed为1的所有资讯
router.get("/getAllDisplayed", getDisplayedInformations);

module.exports = router;
