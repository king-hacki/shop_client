import axios from "axios";

import {
    GET_ALL_ITEMS,
    DELETE_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM
} from './types';

export const getItems = () => (dispatch, getState) => {
    axios
        .get('http://localhost:8080/api/mobilePhone')
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_ALL_ITEMS,
                payload: res.data
            })
        })
};