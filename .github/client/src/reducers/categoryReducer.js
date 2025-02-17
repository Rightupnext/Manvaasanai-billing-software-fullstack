import { FETCH_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, START_LOADING, END_LOADING } from '../actions/constants';

const categoryReducer = (state = { isLoading: true, categories: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
      
    case END_LOADING:
      return { ...state, isLoading: false };
      
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload, isLoading: false };

    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category._id !== action.payload),
      };

    default:
      return state;
  }
};

export default categoryReducer;
