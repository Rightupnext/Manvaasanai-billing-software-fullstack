import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductKiloGrams,
  getProducts,
} from "../../actions/productAction";

import AddProductNameModel from "./AddProductNameModel";
import ProductChart from "./ProductChart";
import ReduceProduct from "./ReduceProduct";
import { GetCategory } from "../../actions/categoryAction";

function AddStock() {
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [modelOpen3, setModelOpen3] = useState(false);
  const [formProduct, setFormProduct] = useState({
    productName: "",
    kilo: "",
    grams: "",
    categoryId: "",
  });
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetCategory());
  }, [dispatch]);

  const handleModelOpen = () => {
    setModelOpen(true);
  };

  const handleModelClose = () => {
    setModelOpen(false);
  };
  const handleModelOpen2 = () => {
    setModelOpen2(true);
  };

  const handleModelClose2 = () => {
    setModelOpen2(false);
  };
  const handleModelOpen3 = () => {
    setModelOpen3(true);
  };

  const handleModelClose3 = () => {
    setModelOpen3(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      productName: formProduct.productName,
      kilo: formProduct.kilo !== "" ? parseFloat(formProduct.kilo) : 0,
      grams: formProduct.grams !== "" ? parseInt(formProduct.grams) : 0,
      categoryId: formProduct.categoryId,
    };

    dispatch(createProductKiloGrams(newProduct)).then(() => {
      dispatch(getProducts());
    });

    setFormProduct({ productName: "", kilo: "", grams: "" ,categoryId:""});
  };

  return (
    <>
      <div className="">
        <div className="grid grid-cols-3">
          <button
            onClick={handleModelOpen}
            className="h-[40px]  w-[40%] mt-2 ml-[90px] focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            ADD PRODUCT NAME
          </button>

          <form
            className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] mt-1"
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="text-center text-xl font-bold">Add Product</h1>
            </div>

            <div className="flex items-center">
              <label className="text-gray-700 w-36 text-sm">Product Name</label>

              <select
                name="productName"
                value={formProduct.productName}
                onChange={handleChange}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              >
                <option value="">Select Product</option>{" "}
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <option
                      key={product._id}
                      value={product.productName}
                      className=""
                    >
                      {product.productName}
                    </option>
                  ))
                ) : (
                  <option>No products available</option>
                )}
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-gray-700 w-36 text-sm">
                Select Category
              </label>

              <select
                name="categoryId"
                value={formProduct.categoryId }
                onChange={handleChange}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              >
                <option value="">Select Category</option>{" "}
                {categories?.categories && categories?.categories.length > 0 ? (
                  categories?.categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      className=""
                    >
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option>No products available</option>
                )}
              </select>
            </div>

            <div className="flex items-center">
              <label className="text-gray-700 w-36 text-sm">Kilo's</label>
              <input
                name="kilo"
                type="number"
                placeholder="Enter your Kg"
                value={formProduct.kilo}
                onChange={handleChange}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              />
            </div>

            <div className="flex items-center">
              <label className="text-gray-700 w-36 text-sm">Grams</label>
              <input
                name="grams"
                type="number"
                placeholder="Enter your grams"
                value={formProduct.grams}
                onChange={handleChange}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              />
            </div>

            <button
              type="submit"
              className="!mt-8 px-6 py-2 w-full bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block"
            >
              Submit
            </button>
          </form>
          <button
            onClick={handleModelOpen2}
            className="h-[40px]  w-[40%] mt-2  ml-[290px]  focus:outline-none text-white bg-indigo-400 hover:bg-indigo--500 focus:ring-4 focus:ring-indigo--300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-indigo-900"
          >
            REDUCE PRODUCT
          </button>
        </div>
        {modelOpen && (
          <AddProductNameModel
            handleCloseModel={handleModelClose}
            handleCloseModel3={handleModelClose3}
            handleModelOpen3={handleModelOpen3}
            modelOpen3={modelOpen3}
          />
        )}
        <ProductChart />
        {modelOpen2 && <ReduceProduct handleCloseModel2={handleModelClose2} />}
      </div>
    </>
  );
}

export default AddStock;
