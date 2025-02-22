// 数据库连接配置
const mysql = require("mysql2/promise");

// 2、建立与mysql 数据库的链接
const db = mysql.createPool({
  host: "localhost", // 数据库的ip地址
  user: "root", // 登录数据库的账号
  password: "20030103", // 登录数据库的密码
  database: "photography", //指定要操作的数据库
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+08:00", // 设置为本地时区
});

module.exports = db;
