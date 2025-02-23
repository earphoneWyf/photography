const db = require("../db/index");

// 发起预约
const initiateReservation = async (req, res) => {
  const { content, initiator, receiver } = req.body;
  try {
    await db.execute(
      "INSERT INTO reservations (content, initiator, receiver, is_agreed) VALUES (?, ?, ?, 0)",
      [content, initiator, receiver]
    );
    res.json({ code: 200, message: "预约发起成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "预约发起失败" });
  }
};

// 编辑预约（修改是否同意的状态，0 为不同意，1 为同意）
const editReservation = async (req, res) => {
  const { id, is_agreed } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM reservations WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "预约信息不存在" });
    }
    await db.execute("UPDATE reservations SET is_agreed = ? WHERE id = ?", [
      is_agreed,
      id,
    ]);
    res.json({ code: 200, message: "预约状态更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "预约状态更新失败" });
  }
};

// 根据用户 id 获取预约数据（data 中返回两个对象，一个是我发起的，一个是我收到的）
const getReservationsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [initiatedRows] = await db.execute(
      `
            SELECT 
                r.*,
                initiator_user.id AS initiator_id,
                initiator_user.username AS initiator_username,
                initiator_user.avatar AS initiator_avatar,
                initiator_user.contact AS initiator_contact,
                receiver_user.id AS receiver_id,
                receiver_user.username AS receiver_username,
                receiver_user.avatar AS receiver_avatar,
                receiver_user.contact AS receiver_contact
            FROM 
                reservations r
            JOIN 
                users initiator_user ON r.initiator = initiator_user.id
            JOIN 
                users receiver_user ON r.receiver = receiver_user.id
            WHERE 
                r.initiator = ?
        `,
      [userId]
    );

    const [receivedRows] = await db.execute(
      `
            SELECT 
                r.*,
                initiator_user.id AS initiator_id,
                initiator_user.username AS initiator_username,
                initiator_user.avatar AS initiator_avatar,
                initiator_user.contact AS initiator_contact,
                receiver_user.id AS receiver_id,
                receiver_user.username AS receiver_username,
                receiver_user.avatar AS receiver_avatar,
                receiver_user.contact AS receiver_contact
            FROM 
                reservations r
            JOIN 
                users initiator_user ON r.initiator = initiator_user.id
            JOIN 
                users receiver_user ON r.receiver = receiver_user.id
            WHERE 
                r.receiver = ?
        `,
      [userId]
    );

    const formattedInitiated = initiatedRows.map((row) => {
      const {
        initiator_id,
        initiator_username,
        initiator_avatar,
        initiator_contact,
        receiver_id,
        receiver_username,
        receiver_avatar,
        receiver_contact,
        ...rest
      } = row;
      return {
        ...rest,
        initiator: {
          id: initiator_id,
          username: initiator_username,
          avatar: initiator_avatar,
          contact: initiator_contact,
        },
        receiver: {
          id: receiver_id,
          username: receiver_username,
          avatar: receiver_avatar,
          contact: receiver_contact,
        },
      };
    });

    const formattedReceived = receivedRows.map((row) => {
      const {
        initiator_id,
        initiator_username,
        initiator_avatar,
        initiator_contact,
        receiver_id,
        receiver_username,
        receiver_avatar,
        receiver_contact,
        ...rest
      } = row;
      return {
        ...rest,
        initiator: {
          id: initiator_id,
          username: initiator_username,
          avatar: initiator_avatar,
          contact: initiator_contact,
        },
        receiver: {
          id: receiver_id,
          username: receiver_username,
          avatar: receiver_avatar,
          contact: receiver_contact,
        },
      };
    });

    const data = {
      initiated: formattedInitiated,
      received: formattedReceived,
    };

    res.json({ code: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "获取预约信息失败" });
  }
};

// 删除预约
const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM reservations WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "预约信息不存在" });
    }
    await db.execute("DELETE FROM reservations WHERE id = ?", [id]);
    res.json({ code: 200, message: "预约删除成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "预约删除失败" });
  }
};

// 编辑预约的内容
const editReservationContent = async (req, res) => {
  const { id, content } = req.body;
  console.log("req.body", req.body);
  try {
    const [rows] = await db.execute("SELECT * FROM reservations WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.json({ code: 404, message: "预约信息不存在" });
    }
    await db.execute("UPDATE reservations SET content = ? WHERE id = ?", [
      content,
      id,
    ]);
    res.json({ code: 200, message: "预约内容更新成功" });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "预约内容更新失败" });
  }
};

// 根据发起者 id 和接收者 id 来判断两者是否有预约
const checkReservationStatus = async (req, res) => {
  const { initiatorId, receiverId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM reservations WHERE initiator = ? AND receiver = ?",
      [initiatorId, receiverId]
    );
    let isReserved = rows.length > 0;
    let status = null;
    if (isReserved) {
      status = rows[0].is_agreed === 1 ? "预约成功" : "等待验证";
    }
    const data = {
      isReserved,
      status,
    };
    res.json({ code: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: "查询预约状态失败" });
  }
};

module.exports = {
  initiateReservation,
  editReservation,
  getReservationsByUserId,
  deleteReservation,
  editReservationContent,
  checkReservationStatus,
};
