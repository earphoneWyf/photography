const db = require("../db/index");

// 管理员登录
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("req.body", req.body);
  try {
    const [rows] = await db.execute(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length === 0) {
      return res.json({ code: 60204, message: "用户名或密码错误" });
    }
    const admin = rows[0];
    const token = "admin-token"; // 简单模拟 token
    res.json({ code: 20000, data: { admin, token } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "登录失败" });
  }
};

// 获取管理员信息
const getAdminInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM admins WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ code: 50008, message: "登录失败，无法获取管理员详情" });
    }
    const admin = rows[0];
    res.json({
      code: 20000,
      data: {
        admin,
        token: "admin-token",
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取管理员信息失败" });
  }
};

// 更新管理员信息
const updateAdminInfo = async (req, res) => {
  const { id, username, password, avatar } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM admins WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "管理员不存在" });
    }
    await db.execute(
      "UPDATE admins SET username = ?, password = ?, avatar = ? WHERE id = ?",
      [username, password, avatar, id]
    );
    const [updatedRows] = await db.execute(
      "SELECT * FROM admins WHERE id = ?",
      [id]
    );
    const updatedAdmin = updatedRows[0];
    res.json({
      code: 20000,
      message: "管理员信息更新成功",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "更新管理员信息失败" });
  }
};

// 管理员退出登录
const logout = (req, res) => {
  res.json({ code: 20000, data: "success" });
};

module.exports = {
  login,
  getAdminInfo,
  updateAdminInfo,
  logout,
};
