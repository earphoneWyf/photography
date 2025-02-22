const db = require("../db/index");

// 注册
const register = async (req, res) => {
  const { username, password, role, contact, avatar } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (!Array.isArray(rows)) {
      throw new TypeError("Expected rows to be an array");
    }
    if (rows.length > 0) {
      return res.json({ code: 400, message: "用户名已存在" });
    }
    await db.execute(
      "INSERT INTO users (username, password, role, contact, is_verified, avatar) VALUES (?, ?, ?, ?, 0, ?)",
      [username, password, role, contact, avatar]
    );
    res.json({ code: 200, message: "注册成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "注册失败" });
  }
};

// 登录
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (!Array.isArray(rows)) {
      throw new TypeError("Expected rows to be an array");
    }
    if (rows.length === 0) {
      return res.json({ code: 400, message: "用户名或密码错误" });
    }
    const user = rows[0];

    if (!user.is_verified) {
      return res.json({ code: 400, message: "管理员暂未验证" });
    }

    res.json({ code: 200, data: { user } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "登录失败" });
  }
};

// 根据用户 ID 获取用户信息
const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "用户不存在" });
    }
    const user = rows[0];
    res.json({ code: 200, data: { user } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取用户信息失败" });
  }
};

// 更新用户信息
const updateUserInfo = async (req, res) => {
  const { id, username, password, role, contact, avatar } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "用户不存在" });
    }
    await db.execute(
      "UPDATE users SET username = ?, password = ?, role = ?, contact = ?, avatar = ? WHERE id = ?",
      [username, password, role, contact, avatar, id]
    );
    res.json({ code: 200, message: "用户信息更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "更新用户信息失败" });
  }
};

// 获取全部用户数据
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json({ code: 20000, data: { users: rows } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取用户数据失败" });
  }
};

// 修改用户状态
const updateUserStatus = async (req, res) => {
  const { id, is_verified } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "用户不存在" });
    }
    await db.execute("UPDATE users SET is_verified = ? WHERE id = ?", [
      is_verified,
      id,
    ]);
    res.json({ code: 20000, message: "用户状态更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "更新用户状态失败" });
  }
};

// 获取推荐的摄影师和模特
const getRecommendedUsers = async (req, res) => {
  try {
    // 获取所有摄影师
    const [photographers] = await db.execute("SELECT * FROM users WHERE role = '摄影师'");
    // 获取所有模特
    const [models] = await db.execute("SELECT * FROM users WHERE role = '模特'");

    // 随机推荐摄影师
    let recommendedPhotographers = photographers;
    if (photographers.length > 5) {
      recommendedPhotographers = [];
      const photographerIndices = new Set();
      while (recommendedPhotographers.length < 5) {
        const randomIndex = Math.floor(Math.random() * photographers.length);
        if (!photographerIndices.has(randomIndex)) {
          recommendedPhotographers.push(photographers[randomIndex]);
          photographerIndices.add(randomIndex);
        }
      }
    }

    // 随机推荐模特
    let recommendedModels = models;
    if (models.length > 5) {
      recommendedModels = [];
      const modelIndices = new Set();
      while (recommendedModels.length < 5) {
        const randomIndex = Math.floor(Math.random() * models.length);
        if (!modelIndices.has(randomIndex)) {
          recommendedModels.push(models[randomIndex]);
          modelIndices.add(randomIndex);
        }
      }
    }

    res.json({
      code: 200,
      data: {
        photographers: recommendedPhotographers,
        models: recommendedModels
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取推荐用户失败" });
  }
};
module.exports = {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  updateUserStatus,
  getRecommendedUsers
};
