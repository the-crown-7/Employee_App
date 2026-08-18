import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // 1. Check employee exists
    const [users] = await db.execute(
      "SELECT * FROM employees WHERE employee_id = ?",
      [employeeId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const user = users[0];

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 3. Create JWT token (12 hours)
    const token = jwt.sign(
      {
        id: user.id,
        employeeId: user.employeeId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // 4. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      employee: {
        id: user.id,
        name: user.name,
        employeeId: user.employeeId,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};