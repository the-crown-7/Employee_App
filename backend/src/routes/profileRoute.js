import express from "express";
import { getProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);

export default router;