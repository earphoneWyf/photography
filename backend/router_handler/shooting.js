const db = require("../db/index");
const moment = require("moment-timezone");

// 获取全部约拍信息
const getAllShootingDemands = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        sd.id, 
        sd.target, 
        sd.shooting_time AS shootingTime, 
        sd.location, 
        sd.cost, 
        sd.requirement, 
        u.id AS publisherId, 
        u.username, 
        u.avatar, 
        u.role,
        u.contact
      FROM shooting_demands sd
      JOIN users u ON sd.user_id = u.id
    `);

    const data = rows.map((row) => ({
      id: row.id,
      target: row.target,
      shootingTime: moment(row.shootingTime).tz("Asia/Shanghai").format(),
      location: row.location,
      cost: row.cost,
      requirement: row.requirement,
      publisher: {
        id: row.publisherId,
        username: row.username,
        avatar: row.avatar,
        role: row.role,
        contact: row.contact,
      },
    }));

    res.json({ code: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取约拍信息失败" });
  }
};

// 根据约拍的 id 获取某一个约拍的信息
const getShootingDemandById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM shooting_demands WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.json({ code: 404, message: "约拍信息不存在" });
    }
    res.json({ code: 200, shootingDemand: rows[0] });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取约拍信息失败" });
  }
};

// 更新约拍的内容
const updateShootingDemand = async (req, res) => {
  const { id } = req.params;
  console.log("req.params", req.params);

  const { target, shooting_time, location, cost, requirement } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM shooting_demands WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.json({ code: 404, message: "约拍信息不存在" });
    }
    await db.execute(
      "UPDATE shooting_demands SET target = ?, shooting_time = ?, location = ?, cost = ?, requirement = ? WHERE id = ?",
      [target, shooting_time, location, cost, requirement, id]
    );
    res.json({ code: 200, message: "约拍信息更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "约拍信息更新失败" });
  }
};

// 发布约拍
const publishShootingDemand = async (req, res) => {
  const { user_id, target, shooting_time, location, cost, requirement } =
    req.body;
  try {
    await db.execute(
      "INSERT INTO shooting_demands (user_id, target, shooting_time, location, cost, requirement) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, target, shooting_time, location, cost, requirement]
    );
    res.json({ code: 200, message: "约拍发布成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "约拍发布失败" });
  }
};

// 根据用户 ID 获取该用户的所有约拍信息
const getShootingDemandsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM shooting_demands WHERE user_id = ?",
      [userId]
    );
    res.json({ code: 200, data: rows });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取约拍信息失败" });
  }
};

module.exports = {
  getAllShootingDemands,
  getShootingDemandById,
  updateShootingDemand,
  publishShootingDemand,
  getShootingDemandsByUserId,
};
