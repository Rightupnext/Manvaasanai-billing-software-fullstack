import mongoose from "mongoose";


const ProductSchema=mongoose.Schema({
    productName:{type:String},
    price:{type:Number},
    stock:{type:Number},
})
const ProductModel=mongoose.model('products',ProductSchema);
export default ProductModel