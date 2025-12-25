const express = require("express");
const { createProduct, updateProduct, deleteProduct, getProducts } = require("../Controllers/product.controller");
const { protectedRoute } = require("../Middleware/auth.middleware");

const router = express.Router();

router.post("/create-product", protectedRoute, createProduct);
router.put("/update-product/:product_id",protectedRoute, updateProduct);
router.delete("/delete-product/:product_id", protectedRoute, deleteProduct);
router.get("/get-products", protectedRoute, getProducts);

module.exports = router;
