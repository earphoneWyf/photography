const express = require("express");
const router = express.Router();
const {
  login,
  getAdminInfo,
  updateAdminInfo,
  logout,
} = require("../router_handler/admin");

router.post("/login", login);
router.get("/info/:id", getAdminInfo);
router.post("/update", updateAdminInfo);
router.post("/logout", logout);

module.exports = router;