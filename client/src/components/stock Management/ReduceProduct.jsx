import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateProductKiloGrams,
} from "../../actions/productAction"; // Assuming you have this action

function ReduceKiloGrams({ handleCloseModel2 }) {
  const dispatch = useDispatch();
  const [formProduct, setFormProduct] = useState({
    productNameId: "", // To store the selected product ID
    kilo: "",
    grams: "",
  });

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    // Optionally, dispatch an action to fetch products if not done yet
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formProduct.productNameId) {
      alert("Please select a product");
      return;
    }

    const updatedProduct = {
      productNameId: formProduct.productNameId,
      kilo: formProduct.kilo !== "" ? parseFloat(formProduct.kilo) : 0,
      grams: formProduct.grams !== "" ? parseInt(formProduct.grams) : 0,
    };

    dispatch(updateProductKiloGrams(updatedProduct)).then(() =>
      dispatch(getProducts),
    handleCloseModel2()
    );

    setFormProduct({ productNameId: "", kilo: "", grams: "" });
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-gray-800 text-xl font-bold flex-1">
            Reduce Product Kilo & Grams
          </h3>
          <svg
            onClick={handleCloseModel2}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            />
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            />
          </svg>
        </div>
        <div className="my-6">
          <form
            className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]"
            onSubmit={handleSubmit}
          >
            <div>
              <h1>Reduce Kilo & Grams</h1>
            </div>

            <div className="flex items-center">
              <label className="text-gray-700 w-36 text-sm">Product Name</label>

              <select
                name="productNameId"
                value={formProduct.productNameId}
                onChange={handleChange}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              >
                <option value="">Select Product</option>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.productName}
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
                placeholder="Enter Kilos"
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
                placeholder="Enter Grams"
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
        </div>
        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={handleCloseModel2}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReduceKiloGrams;
