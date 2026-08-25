import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be Gmail App Password
  },
});

// Optional: verify SMTP connection on startup


export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"TCCKOL" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html, // IMPORTANT: HTML EMAIL
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    throw error;
  }
};