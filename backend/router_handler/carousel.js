const db = require("../db/index");
const path = require('path');

// 获取全部轮播图信息
const getAllCarousels = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM carousels");
    res.json({ code: 20000, data: { carousels: rows } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取轮播图信息失败" });
  }
};

// 新增轮播图
const addCarousel = async (req, res) => {
  const { image_url, is_displayed } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO carousels (image_url, is_displayed, created_at) VALUES (?, ?, NOW())",
      [image_url, is_displayed]
    );
    console.log("result", result);
    const [rows] = await db.execute("SELECT * FROM carousels WHERE id = ?", [
      result.insertId,
    ]);
    const newCarousel = rows[0];
    res.json({
      code: 20000,
      message: "新增轮播图成功",
      data: { carousel: newCarousel },
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "新增轮播图失败" });
  }
};

// 删除轮播图
const deleteCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM carousels WHERE id = ?", [id]);
    res.json({ code: 20000, message: "删除轮播图成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "删除轮播图失败" });
  }
};

// 根据 ID 修改是否呈现的字段
const updateCarouselDisplayStatus = async (req, res) => {
  const { id, is_displayed } = req.body;
  try {
    await db.execute("UPDATE carousels SET is_displayed = ? WHERE id = ?", [
      is_displayed,
      id,
    ]);
    const [rows] = await db.execute("SELECT * FROM carousels WHERE id = ?", [
      id,
    ]);
    const updatedCarousel = rows[0];
    res.json({
      code: 20000,
      message: "轮播图状态更新成功",
      data: { carousel: updatedCarousel },
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "轮播图状态更新失败" });
  }
};

// 获取is_verified为1的所有轮播图数据
const getVerifiedCarousels = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM carousels WHERE is_displayed = 1");
    res.json({ code: 200, data: { carousels: rows } });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取已验证轮播图信息失败" });
  }
};

module.exports = {
  getAllCarousels,
  addCarousel,
  deleteCarousel,
  updateCarouselDisplayStatus,
  getVerifiedCarousels
};
