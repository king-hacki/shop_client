import { combineReducers } from "redux";
import productReducer from './productReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import commentReducer from './commentReducer'
<<<<<<< HEAD
import filterReducer from './filterReducer'
=======
import repliesReducer from './repliesReducer'
>>>>>>> 91376e82dfe44dcb866a581e907b8d6936109ff5

export default combineReducers({
  productReducer,
  userReducer,
  cartReducer,
<<<<<<< HEAD
  commentReducer,
  filterReducer
=======
  commentReducer, 
  repliesReducer
>>>>>>> 91376e82dfe44dcb866a581e907b8d6936109ff5
});