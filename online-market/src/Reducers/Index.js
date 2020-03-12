import { combineReducers } from "redux";
import productReducer from './productReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import commentReducer from './commentReducer'
import filterReducer from './filterReducer'
import repliesReducer from './repliesReducer'


export default combineReducers({
  productReducer,
  userReducer,
  cartReducer,
  commentReducer,
  filterReducer,
  repliesReducer
});