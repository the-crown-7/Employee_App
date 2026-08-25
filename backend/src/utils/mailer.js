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

transporter.verify((error) => {
  if (error) {
    console.log("❌ SMTP ERROR:", error.message);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const sendEmail = async (to, subject, html) => {
  console.log("📨 SENDING EMAIL TO:", to);

  const info = await transporter.sendMail({
    from: `"TCCKOL" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("📩 EMAIL INFO:", info.response);
};