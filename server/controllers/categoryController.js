import CategoryModel from "../models/category.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { categoryName, CGST, SGST } = req.body;
        const newCategory = new CategoryModel({ categoryName, CGST, SGST });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
