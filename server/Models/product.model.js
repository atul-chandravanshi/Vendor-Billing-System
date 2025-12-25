
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      kilogram: {
        type: Number,
        default: 0,
        min: 0,
      },
      gram: {
        type: Number,
        default: 0,
        min: 0,
        max: 999,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    Picture: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 1, userId: 1 }, { unique: true });

productSchema.virtual("totalQuantityInKg").get(function () {
  return this.quantity.kilogram + this.quantity.gram / 1000;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
