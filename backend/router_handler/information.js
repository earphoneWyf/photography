const db = require("../db/index");

// 获取全部资讯信息
const getAllInformations = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM information");
    res.json({ code: 20000, data: { informations: rows } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取资讯信息失败" });
  }
};

// 新增资讯
const addInformation = async (req, res) => {
  const { title, content, is_displayed } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO information (title, content, is_displayed, created_at) VALUES (?, ?, ?, NOW())",
      [title, content, is_displayed]
    );
    const [rows] = await db.execute("SELECT * FROM information WHERE id = ?", [
      result.insertId,
    ]);
    const newInformation = rows[0];
    res.json({
      code: 20000,
      message: "新增资讯成功",
      data: { information: newInformation },
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "新增资讯失败" });
  }
};

// 删除资讯
const deleteInformation = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM information WHERE id = ?", [id]);
    res.json({ code: 20000, message: "删除资讯成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "删除资讯失败" });
  }
};

// 编辑资讯（编辑某个资讯的是否展示，is_displayed为1/0）
const updateInformationDisplayStatus = async (req, res) => {
  const { id, is_displayed } = req.body;
  try {
    await db.execute("UPDATE information SET is_displayed = ? WHERE id = ?", [
      is_displayed,
      id,
    ]);
    const [rows] = await db.execute("SELECT * FROM information WHERE id = ?", [
      id,
    ]);
    const updatedInformation = rows[0];
    res.json({
      code: 20000,
      message: "资讯状态更新成功",
      data: { information: updatedInformation },
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "资讯状态更新失败" });
  }
};

// 获取is_displayed为1的所有资讯
const getDisplayedInformations = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM information WHERE is_displayed = 1"
    );
    res.json({ code: 200, data: { informations: rows } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取已展示资讯信息失败" });
  }
};

module.exports = {
  getAllInformations,
  addInformation,
  deleteInformation,
  updateInformationDisplayStatus,
  getDisplayedInformations,
};
