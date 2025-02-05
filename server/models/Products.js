import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({
    productName: { type: String },
    Kilo: { type: Number },
    grams: { type: Number },
  });
  
  const ProductModel = mongoose.model('products', ProductSchema);
  export default ProductModel;
  