import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginEmployee = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const password = req.body.password;

    if (!employee_id || !password) {
      return res.status(400).json({
        success: false,
        message: "employee_id and password are required",
      });
    }

    const [users] = await db.execute(
      "SELECT * FROM employees WHERE employee_id = ?",
      [employee_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        employee_id: user.employee_id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,

    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};