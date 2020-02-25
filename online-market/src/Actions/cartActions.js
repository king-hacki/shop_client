import axios from 'axios'

import {
    GET_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM_FROM_CART
} from './types'

import {tokenConfig} from './userActions'
import {toast} from 'react-toastify'

export const getShoppingCart = () => (dispatch, getState) => {
    axios
        .get("http://localhost:8080/api/cart/getCart", tokenConfig(getState))
        .then(res => {
            let totalPrice = 0
            console.log("COUNT" + res.data.mobilePhoneList.length)
            console.log(res.data)
            res.data.mobilePhoneList.map(item=>{
                totalPrice += item.price
            })
            dispatch({
                type: GET_CART,
                payload: res.data,
                price: totalPrice
            })
        })

}

export const addItem = (item) => (dispatch, getState) => {

    console.log(tokenConfig(getState))
    
    console.log("ITEM" + item)

    axios
        .post(`http://localhost:8080/api/cart/addItem/${item}`,null, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({
                type: ADD_ITEM_TO_CART,
                payload: res.data
            })
            toast.success("phone added to cart successfully!",{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch(err=>{
            toast.error(err.response.data.mobileIdentifier, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

export const deleteItem = (itemIdentifier) => (dispatch, getState) => {

    axios
        .delete(`http://localhost:8080/api/cart/${itemIdentifier}`,tokenConfig(getState))
        .then(res => {
            toast.success(res.data, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch({
                type : DELETE_ITEM_FROM_CART,
            })
            dispatch(getShoppingCart())
        })
}

export const applyOrder = () => (dispatch, getState) => {
    axios
        .post("http://localhost:8080/api/cart/apply",null, tokenConfig(getState))
        .then(res =>{
            console.log("SUCCESS")
        })
}