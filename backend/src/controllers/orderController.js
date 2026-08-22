import db from "../config/db.js";

export const createOrder = async (req, res) => {
  try {

    const { amount, product_name } = req.body || {};

    const employee_id = req.user?.employee_id;


    if (!amount || !product_name) {

      return res.status(400).json({
        success: false,
        message: "Amount and product name are required",
      });
    }

    const order_id = "ORD" + Date.now();

    const now = new Date();
    const order_date = now.toISOString().split("T")[0];
    const order_time = now.toTimeString().split(" ")[0];

    const sql = `
      INSERT INTO orders 
      (order_id, employee_id, product_name, amount, order_date, order_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
      order_id,
      employee_id,
      product_name,
      amount,
      order_date,
      order_time,
    ]);


    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order_id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};