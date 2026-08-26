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
    console.error(" SMTP ERROR:", error);
  } else {
    console.log(" SMTP READY");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,  
      to,
      subject,
      html,
    });

    return info;

  } catch (error) {
    throw error;
  }
};