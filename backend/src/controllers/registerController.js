import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateEmployeeId } from "../utils/generateEmployeeID.js";
import { sendEmail } from "../utils/mailer.js";

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user exists
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

    // 3. Generate Employee ID
    const employee_id = generateEmployeeId();
    console.log("Generated Employee ID:", employee_id);

    // 4. Save to DB
    await db.execute(
      "INSERT INTO employees (employee_id, name, email, password) VALUES (?,?,?,?)",
      [employee_id, name, email, hashedPassword]
    );

    // ✅ 5. SEND RESPONSE FIRST (NO DELAY)
    res.status(201).json({
      success: true,
      message: "Registration successful. Employee ID will be sent to email",
      employee_id,
    });

    // ✅ 6. SEND EMAIL IN BACKGROUND (NON-BLOCKING)
    sendEmail(
      email,
      "Your Employee ID - Registration Successful",
      `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>Welcome ${name}</h2>
          <p>Your registration is successful.</p>

          <hr />

          <h3 style="color: #2c3e50;">
            Your Employee ID:
            <span style="color: green;">${employee_id}</span>
          </h3>

          <p>Please save this ID for login purposes.</p>

          <br />
          <p>Regards,<br/>TCCKOL Team</p>
        </div>
      `
    )
      .then(() => {
        console.log("📩 Email sent successfully");
      })
      .catch((err) => {
        console.log("❌ Email failed:", err.message);
      });

  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};