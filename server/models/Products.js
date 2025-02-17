import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category", }, // Reference to Category
  Kilo: { type: Number, default: 0 },
  grams: { type: Number, default: 0 },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
