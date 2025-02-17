import * as api from '../api/index';
import axios from 'axios';
import { START_LOADING, END_LOADING, FETCH_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './constants';
const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})
// Action to fetch products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// Action to create a new product
export const createProductKiloGrams = (product, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(product);
    dispatch({ type: ADD_PRODUCT, payload: data });
    openSnackbar('Product added successfully');
  } catch (error) {
    console.log(error);
  }
};
export const createProductName = (productName, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.addProductName(productName);
    dispatch({ type: ADD_PRODUCT, payload: data });
    openSnackbar('Product Name added successfully');
  } catch (error) {
    console.log(error);
  }
};

// Action to update an existing product
export const updateProductKiloGrams = (updatedProduct, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await API.put(`/products/update-kilo-grams`, updatedProduct);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
    openSnackbar('Product updated successfully');
  } catch (error) {
    console.log(error);
  }
};


// Action to delete a product
export const deleteProduct = (id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    openSnackbar('Product deleted successfully');
  } catch (error) {
    console.log(error);
  }
};
