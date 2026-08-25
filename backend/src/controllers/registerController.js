import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateEmployeeId } from "../utils/generateEmployeeID.js";
import { sendEmail } from "../utils/mailer.js";

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("📩 EMAIL FROM FRONTEND:", email);

    // 1. Check existing user
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

    // 4. Save to DB
    await db.execute(
      "INSERT INTO employees (employee_id, name, email, password) VALUES (?,?,?,?)",
      [employee_id, name, email, hashedPassword]
    );

    // 5. SEND EMAIL SAFELY (DO NOT BLOCK RESPONSE)
    setImmediate(async () => {
      try {
        await sendEmail(
          console.log("📩 SENDING EMAIL TO:", email),
          email,
          "Your Employee ID - TCCKOL",
          `
            <div style="font-family: Arial; padding: 10px;">
              <h2>Welcome ${name}</h2>
              <p>Your Employee ID is:</p>
              <h3 style="color:#2E86C1">${employee_id}</h3>
              <p>Please keep it safe.</p>
            </div>
          `
        );

        console.log("📩 EMAIL SENT SUCCESSFULLY to:", email);
      } catch (err) {
        console.log("❌ EMAIL FAILED:", err.message);
      }
    });

    // 6. RESPONSE SENT IMMEDIATELY
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      employee_id,
      setImmediate: true, // Indicates that email sending is handled asynchronously;
    });

  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};