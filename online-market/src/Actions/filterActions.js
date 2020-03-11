import axios from "axios";

import {GET_FILTERS, GET_ALL_ITEMS_PAGE, FILTERED} from './types'

import {tokenConfig} from './userActions'

export const getFilters = () => (dispatch, getState) => {
    axios
        .get("http://localhost:8080/api/mobilePhone/filters", tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_FILTERS,
                payload: res.data
            })
        })
}

export const filterByBrands = (brands,price,page) => (dispatch, getState) => {
    const request = {
        brands: brands,
        priceRange: price
    }
    axios
        .post(`http://localhost:8080/api/mobilePhone/filterByBrand?page=${page-1}`, request, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_ALL_ITEMS_PAGE,
                payload: res.data
            })
            dispatch({
                type: FILTERED,
                payload: request
            })
        })
}