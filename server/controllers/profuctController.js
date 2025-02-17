import ProductModel from "../models/Products.js";
const convertToGrams = (kilos, grams) => {
  return kilos * 1000 + grams;
};

const convertToKgGrams = (totalGrams) => {
  const kilos = Math.floor(totalGrams / 1000);
  const grams = totalGrams % 1000;
  return { kilos, grams };
};

// Add new product or update existing product's total weight
export const addProductName = async (req, res) => {
  try {
    const { productName } = req.body;
    console.log(productName);
    if (!productName) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const existingProduct = await ProductModel.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({ error: "Product name already exists" });
    }

    const newProduct = new ProductModel({ productName, Kilo: 0, grams: 0 });
    await newProduct.save();

    res
      .status(201)
      .json({
        message: "Product name added successfully",
        product: newProduct,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to update only kilo and grams
export const addProductKiloGrams = async (req, res) => {
  try {
    const { productName, kilo, grams, categoryId } = req.body;

    
    if (!productName || !categoryId) {
      return res.status(400).json({ error: "Product name and category ID are required" });
    }


    const kiloValue = kilo ? parseFloat(kilo) : 0;
    const gramsValue = grams ? parseInt(grams) : 0;

    if (isNaN(kiloValue) || isNaN(gramsValue) || kiloValue < 0 || gramsValue < 0) {
      return res.status(400).json({ error: "Invalid kilo or grams value" });
    }

    
    let existingProduct = await ProductModel.findOne({ productName, category: categoryId });

    if (existingProduct) {
     
      const totalGrams =
        existingProduct.Kilo * 1000 + existingProduct.grams + kiloValue * 1000 + gramsValue;

      existingProduct.Kilo = Math.floor(totalGrams / 1000);
      existingProduct.grams = totalGrams % 1000;

     
      await existingProduct.save();

      return res.status(200).json({
        message: "Stock updated successfully",
        product: existingProduct,
      });
    } else {
     
      let existingProductName = await ProductModel.findOne({ productName });

      if (existingProductName) {
        
        existingProductName.category = categoryId; 
        existingProductName.Kilo += kiloValue;
        existingProductName.grams += gramsValue;

        await existingProductName.save();

        return res.status(200).json({
          message: "Product category updated and stock added successfully",
          product: existingProductName,
        });
      } else {
      
        const newProduct = new ProductModel({
          productName,
          category: categoryId,
          Kilo: kiloValue,
          grams: gramsValue,
        });

        await newProduct.save();

        return res.status(201).json({
          message: "New product created successfully",
          product: newProduct,
        });
      }
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category", ["categoryName", "CGST", "SGST"]);


    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProductKiloGrams = async (req, res) => {
  try {
    const { productNameId, kilo, grams } = req.body;
    console.log(productNameId, kilo, grams);

    if (!productNameId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const kiloValue = kilo ? parseFloat(kilo) : 0;
    const gramsValue = grams ? parseInt(grams) : 0;

    if (isNaN(kiloValue) || isNaN(gramsValue)) {
      return res.status(400).json({ error: "Invalid kilo or grams value" });
    }

    const existingProduct = await ProductModel.findById(productNameId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const currentTotalGrams = existingProduct.Kilo * 1000 + existingProduct.grams;
    const deductedGrams = kiloValue * 1000 + gramsValue;

    if (deductedGrams > currentTotalGrams) {
      return res.status(400).json({ error: "Insufficient stock to deduct" });
    }

    const newTotalGrams = currentTotalGrams - deductedGrams;
    existingProduct.Kilo = Math.floor(newTotalGrams / 1000);
    existingProduct.grams = newTotalGrams % 1000;

    await existingProduct.save();

    res.status(200).json({
      message: "Kilo and grams updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Controller to delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Get ID from URL params

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const existingProduct = await ProductModel.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product
    await existingProduct.deleteOne(); // ✅ Use deleteOne() instead of remove()

    res.status(200).json({
      message: "Product deleted successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

