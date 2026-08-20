import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploads.js";

const router = express.Router();

router.post(
  "/add",
  verifyToken,
  upload.single("image"),
  addProduct
);

// Public or protected
router.get("/view", verifyToken, getAllProducts);

export default router;