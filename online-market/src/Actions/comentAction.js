import axios from 'axios'

import {
    GET_CHAT,
    POST_CHAT,
    EDIT_CHAT
} from './types'

import {tokenConfig} from './userActions'
import {toast} from 'react-toastify'

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

export const postComent = (message, username, phoneId, date) => (dispatch, getState) => {

    const body = JSON.stringify({message, username, phoneId, date})
    console.log(body)
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

export const updateComent = (message, username, messageId, date) => (dispatch, getState) => {

    const body = JSON.stringify({message, username, messageId, date})
    console.log(body)
    axios   
        .post('http://localhost:8080/api/mobilePhone/chat/update', body, tokenConfig(getState))
        .then(res => {
            toast.success("Coment edited", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch({
                type: EDIT_CHAT,
                payload: res.data
            })
        })
}

