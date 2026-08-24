import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    const connection = await db.getConnection();
    console.log(" MySQL Connected Successfully...");
    
    connection.release();
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
};

export default db;