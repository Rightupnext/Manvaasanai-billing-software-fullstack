import  mongoose  from "mongoose";

const CategorySchema=mongoose.Schema({
    categoryName:{type:String},
    CGST:{type:Number},
    SGST:{type:Number}
})
const CategoryModel=mongoose.model('category',CategorySchema);
export default CategoryModel;