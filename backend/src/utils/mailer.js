import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Better SMTP config (more reliable than service: "gmail")
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// ✅ Check SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP ERROR:", error.message);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("📨 Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"TCCKOL" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ Email error:", error.message);
    throw error;
  }
};