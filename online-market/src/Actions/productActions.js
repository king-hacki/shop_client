import axios from "axios";

import {
    GET_ALL_ITEMS,
    DELETE_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM
} from './types';

import {tokenConfig} from './userActions';
import { toast } from "react-toastify";

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