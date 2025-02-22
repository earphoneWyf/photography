// router/upload.js
const express = require("express");
const router = express.Router();
const {
  upload,
  uploadAvatar,
  uploadSample,
  uploadCarousel
} = require("../router_handler/upload");

router.post("/image/avatar", upload.single("image"), uploadAvatar);

router.post("/image/sample", upload.single("image"), uploadSample);

router.post("/image/carousel", upload.single("image"), uploadCarousel);

module.exports = router;
