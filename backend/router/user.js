const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  updateUserStatus,
  getRecommendedUsers,
} = require("../router_handler/user");

router.post("/register", register);
router.post("/login", login);
router.get("/info/:id", getUserInfo);
router.post("/update", updateUserInfo);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUserStatus", updateUserStatus);
router.get("/getRecommendedUsers", getRecommendedUsers);

module.exports = router;
