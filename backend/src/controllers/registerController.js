import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateEmployeeId } from "../utils/generateEmployeeID.js";
import { sendEmail } from "../utils/mailer.js";

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check user exists
    const [existing] = await db.execute(
      "SELECT * FROM employees WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Generate employee ID
    const employee_id = generateEmployeeId();

    // 4. Insert user
    await db.execute(
      "INSERT INTO employees (employee_id, name, email, password) VALUES (?,?,?,?)",
      [employee_id, name, email, hashedPassword]
    );

    // 5. Send email (non-blocking)
    sendEmail(
      email,
      "Your Employee ID",
      `Welcome ${name}, your Employee ID is: ${employee_id}`
    ).catch((err) => {
      console.log("Email failed but user registered:", err.message);
    });

    // 6. Response
    return res.status(201).json({
      success: true,
      message: "Registration successful. Employee ID sent to email",
      employee_id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};