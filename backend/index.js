// 引入 express 框架
const express = require("express");
// 引入cors 用于跨域
const cors = require("cors");
// 引入joi 用于校验表单
const joi = require("joi");
// 导入用户客户端发送过来的JWT字符串，解析还原成JSON对象的包
const { expressjwt } = require("express-jwt");
// 导入jwt配置文件
const config = require("./config");
const path = require("path");

const app = express();
// 将cors 注册成全局中间件
app.use(cors());

const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 没有配置json 返回的时undefined   没有配置urlencoded 返回的时{}
// 配置解析application/x-www-form-urlencoded（表单数据）的中间件
app.use(express.urlencoded({ extended: false }));

// 配置json数据的中间件
app.use(express.json());

// 封装res.custom_err 函数 处理错误情况
app.use((req, res, next) => {
  // status =0 为成功  status=1为失灵
  // err的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.custom_err = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };

  next();
});

// 将JWT字符串还原为json对象
//  expressjwt({ secret: secretKey, algorithms: ["HS256"] }) 用来解析token的中间件
// .unless({ path: [/^\/api\//] }) 用来指定哪些接口不需要访问权限
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息,挂在到req.auth上

// app.use(
//   expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
//     path: [/^\/api\//],
//   })
// );

// 导入模块
const userRouter = require("./router/user");
const uploadRouter = require("./router/upload");
const shootingRouter = require("./router/shooting");
const sampleRouter = require("./router/sample");
const adminRouter = require("./router/admin");
const carouselRouter = require("./router/carousel");
const informationRouter = require("./router/information");

app.use("/user", userRouter);
app.use("/upload", uploadRouter);
app.use("/shooting", shootingRouter);
app.use("/sample", sampleRouter);
app.use("/admin", adminRouter);
app.use("/carousel", carouselRouter);
app.use("/information", informationRouter);

// 错误中间件  必须放在路由后
app.use((err, req, res, next) => {
  // 4.1 Joi 参数校验失败

  if (err instanceof joi.ValidationError) return res.custom_err(err);

  if (err.name === "UnauthorizedError") return res.custom_err("身份认证失败");
  // // 4.2 未知错误
  res.custom_err(err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
