import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// safer verification
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP ERROR:", error.message);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("📨 SENDING EMAIL TO:", to);
    console.log("📧 FROM EMAIL:", process.env.EMAIL_USER);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,   // ✅ IMPORTANT FIX (no alias wrapping)
      to,
      subject,
      html,
    });

    console.log("📩 EMAIL SENT:", info.messageId || info.response);
    return info;

  } catch (error) {
    console.error("❌ EMAIL FAILED:", error);
    throw error;
  }
};