import express from "express";
import { addProductKiloGrams,addProductName ,getProducts,updateProductKiloGrams,deleteProduct} from "../controllers/profuctController.js";

const router = express.Router();

// Route to add or update product
router.post("/add-product-name", addProductName);
router.get("/", getProducts);
router.post("/add-kilo-grams", addProductKiloGrams);
router.put("/update-kilo-grams", updateProductKiloGrams);
router.delete("/delete-product/:id", deleteProduct); 
export default router;
