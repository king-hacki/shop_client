import axios from "axios";

import {
    GET_ALL_ITEMS,
    DELETE_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
    GET_ITEM,
    GET_CHAT,
    POST_CHAT
} from './types';

import {tokenConfig} from './userActions';
import { toast } from "react-toastify";

export const getPhone = id => (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/mobilePhone/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch ( {
                type : GET_ITEM,
                payload : res.data
            })
        })
}

export const getItems = () => (dispatch, getState) => {
    axios
        .get('http://localhost:8080/api/mobilePhone', tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_ALL_ITEMS,
                payload: res.data
            })
        })
};

export const createItem = (mobileIdentifier, brand, model, graduationYear, price) => (dispatch, getState) => {
    
    const body = JSON.stringify({mobileIdentifier,brand,model,graduationYear,price});

    console.log(mobileIdentifier)

    axios
        .post('http://localhost:8080/api/mobilePhone/createItem', body, tokenConfig(getState))
        .then(res => {
            console.log(res)
            toast.success("Item created and saved to database",{
                position: toast.POSITION.TOP_RIGHT
            })
            dispatch({
                type: CREATE_ITEM,
                payload: res.data
            })
        })
}

export const getComents = (id) => (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/mobilePhone/chat/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CHAT,
                payload: res.data
            })
        })
}

export const postComent = (message, username, phoneId) => (dispatch, getState) => {

    const body = JSON.stringify({message, username, phoneId})
    console.log(message)
    axios   
        .post('http://localhost:8080/api/mobilePhone/chat/post', body, tokenConfig(getState))
        .then(res => {
            toast.success("Coment created", {
                position: toast.POSITION.TOP_RIGHT
            })
            dispatch({
                type: POST_CHAT,
                payload: res.data
            })
        })
}