import axios from "axios";

import {
    GET_ALL_ITEMS_PAGE,
    GET_ALL_ITEMS,
    DELETE_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
    GET_ITEM,
    INVALID_TOKEN,
    GET_CHAT,
    POST_CHAT

} from './types';

import {tokenConfig} from './userActions';
import { toast } from "react-toastify";

export const getPhone = id => (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/mobilePhone/phone/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch ( {
                type : GET_ITEM,
                payload : res.data
            })
        })
}

export const getItemsPaging = page => (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/mobilePhone?page=${page-1}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_ITEMS_PAGE,
                payload: res.data
            })
        })
        .catch(err => {
            if(err.response.status == 401){
                dispatch({
                    type: INVALID_TOKEN
                })
            }
        })
};

export const getAllItems = () => (dispatch, getState) => {
    axios
        .get("http://localhost:8080/api/mobilePhone/allPhone", tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_ALL_ITEMS,
                payload: res.data
            })
        })
}

export const createItem = (mobileIdentifier, brand, model, graduationYear, price, photo) => (dispatch, getState) => {
    
    const config = tokenConfig(getState)
    
    //const body = JSON.stringify({mobileIdentifier,brand,model,graduationYear,price,image});

    const data = {
        "mobileIdentifier" : mobileIdentifier,
        "brand" : brand,
        "model" : model,    
        "graduationYear" : graduationYear,
        "price" : price,
        "image" : photo
    }

    console.log(data.image)

    axios
        .post('http://localhost:8080/api/mobilePhone/createItem', data, config)
        .then(res => {
            toast.success("Item created and saved to database",{
                position: toast.POSITION.TOP_RIGHT
            })
            dispatch({
                type: CREATE_ITEM,
                payload: res.data
            })
        })
        .catch(err=>{
            Object.values(err.response.data).map(message => {
                toast.error(message , {
                    position: toast.POSITION.TOP_RIGHT
                })
            });
        })
}

export const deleteItemFromDB = (mobileIdentifier) => (dispatch, getState) => {

    axios
        .delete(`http://localhost:8080/api/mobilePhone/${mobileIdentifier}`, tokenConfig(getState))
        .then(res => {
            toast.success("Mobile Phone with identifier " + mobileIdentifier + " was deleted", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch(getItemsPaging())
        })
}