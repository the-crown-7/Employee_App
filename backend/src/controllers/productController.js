import db from "../config/db.js";

 //Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, mrp, discount } = req.body;

    if (!name || !mrp) {
      return res.status(400).json({
        success: false,
        message: "Name and MRP are required",
      });
    }

    // ✅ Convert to number
    const mrpValue = Number(mrp);
    const discountValue = Number(discount || 0);

    // ✅ Validate discount
    if (discountValue < 0 || discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: "Discount must be between 0 and 100",
      });
    }

    // ✅ Calculate final price
    const finalPrice = Number(
      (mrpValue - (mrpValue * discountValue) / 100).toFixed(2)
    );

    // 👇 Cloudinary image URL
    const image = req.file ? req.file.path : null;

    const [result] = await db.execute(
      "INSERT INTO products (name, description, image, mrp, discount, final_price) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description || null, image, mrpValue, discountValue, finalPrice]
    );

    return res.json({
      success: true,
      message: "Product added successfully",
      productId: result.insertId,
      image,
      final_price: finalPrice, // optional but useful
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