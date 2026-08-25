import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateEmployeeId } from "../utils/generateEmployeeID.js";
import { sendEmail } from "../utils/mailer.js";

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("📩 EMAIL FROM FRONTEND:", email);

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee_id = generateEmployeeId();

    await db.execute(
      "INSERT INTO employees (employee_id, name, email, password) VALUES (?,?,?,?)",
      [employee_id, name, email, hashedPassword]
    );

    // ✅ send response first (NO WAIT)
    res.status(201).json({
      success: true,
      message: "Registered successfully",
      employee_id,
    });

    // ✅ email in background
    sendEmail(
      email,
      "Your Employee ID - TCCKOL",
      `
        <h2>Welcome ${name}</h2>
        <p>Your Employee ID:</p>
        <h3>${employee_id}</h3>
      `
    )
      .then(() => console.log("📩 EMAIL SENT SUCCESSFULLY"))
      .catch((err) => console.log("❌ EMAIL FAILED:", err.message));

  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};