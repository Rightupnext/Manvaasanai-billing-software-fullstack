import express from "express";
import { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/add-categories", createCategory);
router.get("/", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
