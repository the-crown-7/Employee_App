import db from "../config/db.js";

//  Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, mrp, discount } = req.body;
    

    if (!name || !mrp) {
      return res.status(400).json({
        success: false,
        message: "Name and MRP are required",
      });
    }

    // 👇 Cloudinary image URL
    const image = req.file ? req.file.path : null;

    const [result] = await db.execute(
      "INSERT INTO products (name, description, image, mrp, discount) VALUES (?, ?, ?, ?, ?)",
      [name, description || null, image, mrp, discount || 0]
    );

    return res.json({
      success: true,
      message: "Product added successfully",
      productId: result.insertId,
      image, // optional return
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Get All Products
export const getAllProducts = async (req, res) => {
  try {

    const [products] = await db.execute("SELECT * FROM products");

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};