import * as api from '../api/index';
import { START_LOADING, END_LOADING, FETCH_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './constants';

export const GetCategory = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCategory();
    dispatch({ type: FETCH_CATEGORIES, payload: data });
    dispatch({ type: END_LOADING });
    return data; // Return the data to use in the component
  } catch (error) {
    console.log(error);
  }
};

export const createCategories = (category) => async (dispatch) => {
  try {
    const { data } = await api.addCategory(category);
    dispatch({ type: ADD_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(updatedCategory, id);
    dispatch({ type: UPDATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);
    dispatch({ type: DELETE_CATEGORY, payload: id });
  } catch (error) {
    console.log(error);
  }
};
