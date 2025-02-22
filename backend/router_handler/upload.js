const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  //配置上传文件需要存放的位置
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  //配置文件名
  filename: function (req, file, cb) {
    let time = Date.now();
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//创建一个multer对象用来处理文件上传
//multer 可以帮我们解析 content-type:mulipart/form-data这种方式提交的请求数据
const upload = multer({
  storage: storage,
});

const uploadAvatar = (req, res) => {
  if (req.file) {
    const imageUrl = `/images/${req.file.filename}`;
    res.json({ code: 200, imageUrl });
  } else {
    res.json({ code: 400, message: "头像上传失败" });
  }
};

const uploadSample = (req, res) => {
  if (req.file) {
    const imageUrl = `/images/${req.file.filename}`;
    res.json({ code: 200, imageUrl });
  } else {
    res.json({ code: 400, message: "样片上传失败" });
  }
};

const uploadCarousel = (req, res) => {
  if (req.file) {
    const imageUrl = `/images/${req.file.filename}`;
    res.json({ code: 20000, imageUrl });
  } else {
    res.json({ code: 400, message: "轮播图上传失败" });
  }
};

module.exports = {
  upload,
  uploadAvatar,
  uploadSample,
  uploadCarousel,
};
