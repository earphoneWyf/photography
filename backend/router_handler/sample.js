const db = require("../db/index");
const moment = require("moment-timezone");

// 获取全部样片信息
const getAllSamplePhotos = async (req, res) => {
  try {
    const [rows] = await db.execute(`
            SELECT 
                sp.id, 
                sp.title, 
                sp.description, 
                sp.images, 
                u.id AS publisherId, 
                u.username, 
                u.avatar, 
                u.role,
                u.contact
            FROM sample_photos sp
            JOIN users u ON sp.user_id = u.id
        `);

    const data = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      images: JSON.parse(row.images),
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
    res.json({ code: 500, message: "获取样片信息失败" });
  }
};

// 根据样片的 id 获取某一个样片的信息
const getSamplePhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM sample_photos WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.json({ code: 404, message: "样片信息不存在" });
    }
    const row = rows[0];
    const samplePhoto = {
      id: row.id,
      title: row.title,
      description: row.description,
      images: JSON.parse(row.images),
    };
    res.json({ code: 200, samplePhoto });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取样片信息失败" });
  }
};

// 更新样片的内容
const updateSamplePhoto = async (req, res) => {
  const { id } = req.params;
  const { title, description, images } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM sample_photos WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.json({ code: 404, message: "样片信息不存在" });
    }
    await db.execute(
      "UPDATE sample_photos SET title = ?, description = ?, images = ? WHERE id = ?",
      [title, description, JSON.stringify(images), id]
    );
    res.json({ code: 200, message: "样片信息更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "样片信息更新失败" });
  }
};

// 发布样片
const publishSamplePhoto = async (req, res) => {
  const { user_id, title, description, images } = req.body;
  try {
    await db.execute(
      "INSERT INTO sample_photos (user_id, title, description, images) VALUES (?, ?, ?, ?)",
      [user_id, title, description, JSON.stringify(images)]
    );
    res.json({ code: 200, message: "样片发布成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "样片发布失败" });
  }
};

// 根据用户 ID 获取该用户的所有样片信息
const getSamplePhotosByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT 
            sp.id, 
            sp.title, 
            sp.description, 
            sp.images, 
            u.id AS publisherId, 
            u.username, 
            u.avatar, 
            u.role,
            u.contact
         FROM sample_photos sp
         JOIN users u ON sp.user_id = u.id
         WHERE sp.user_id = ?`,
      [userId]
    );

    const data = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      images: JSON.parse(row.images),
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
    res.json({ code: 500, message: "获取样片信息失败" });
  }
};

module.exports = {
  getAllSamplePhotos,
  getSamplePhotoById,
  updateSamplePhoto,
  publishSamplePhoto,
  getSamplePhotosByUserId,
};
