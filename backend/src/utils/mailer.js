import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailUser = process.env.EMAIL_USER?.trim();
const emailPass = process.env.EMAIL_PASS?.trim();

if (!emailUser || !emailPass) {
  console.error(" SMTP configuration is missing EMAIL_USER or EMAIL_PASS");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// safer verification
transporter.verify((error) => {
  if (error) {
    console.error(" SMTP ERROR:", error.message);
  } else {
    console.log(" SMTP READY");
  }
});

export const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: emailUser,
    to,
    subject,
    html,
  });

  console.log(" EMAIL SENT:", info.messageId || info.response);
  return info;
};