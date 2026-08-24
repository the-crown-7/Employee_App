import db from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { product_name, amount } = req.body;

    const employee_id = req.user?.employee_id; 

    if (!employee_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!product_name || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing product_name or amount",
      });
    }

    const order_id = "ORD" + Date.now();

    const query = `
      INSERT INTO orders 
      (order_id, employee_id, amount, order_date, order_time, created_at, product_name)
      VALUES (?, ?, ?, CURDATE(), CURTIME(), NOW(), ?)
    `;

    await db.execute(query, [
      order_id,
      employee_id,
      amount,
      product_name,
    ]);


    return res.json({
      success: true,
      message: "Order created successfully",
      order_id,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};