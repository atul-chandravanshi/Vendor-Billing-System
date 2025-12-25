const Product = require("../Models/product.model.js");

const createProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  const userId = req.user._id;

  try {
    if (!name || price == null || !userId) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const isProduct = await Product.findOne({ name, userId });

    if (isProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    
    let quantityData = { kilogram: 0, gram: 0 };

    if (typeof quantity === "object") {
      quantityData = {
        kilogram: parseFloat(quantity.kilogram) || 0,
        gram: parseFloat(quantity.gram) || 0,
      };
    } else if (quantity != null) {
      
      quantityData.kilogram = parseFloat(quantity) || 0;
    }

    const product = new Product({
      name,
      quantity: quantityData,
      price,
      userId,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { name, quantity, price } = req.body;
  const userId = req.user._id;

  try {
    
    let quantityData = {};

    if (typeof quantity === "object") {
      quantityData = {
        "quantity.kilogram": parseFloat(quantity.kilogram) || 0,
        "quantity.gram": parseFloat(quantity.gram) || 0,
      };
    } else if (quantity != null) {
      quantityData = {
        "quantity.kilogram": parseFloat(quantity) || 0,
        "quantity.gram": 0,
      };
    }

    const updateData = {
      ...(name && { name }),
      ...(price != null && { price }),
      ...quantityData,
    };

    const product = await Product.findOneAndUpdate(
      { _id: product_id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you don't have permission to update it",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Update Product Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Product with this name already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findOneAndDelete({
      _id: product_id,
      userId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  const userId = req.user._id;

  try {
    const products = await Product.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
