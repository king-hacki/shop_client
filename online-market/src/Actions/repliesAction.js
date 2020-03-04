import axios from 'axios'

import {
    POST_REPLY,
    GET_REPLIES
} from "./types"

import {tokenConfig} from './userActions'
import {toast} from 'react-toastify'

export const postReply = (message, username, date, messageParentId) => (dispatch, getState) => {
    
    const body = JSON.stringify({message, username, date, messageParentId})
    console.log(body)

    axios
        .post("http://localhost:8080/api/mobilePhone/chat/reply", body, tokenConfig(getState))
        .then(res => {
            toast.success("Coment created", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch({
                type: POST_REPLY,
                payload: res.data
            })
        })
}

export const getReplies = (messageId) => (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/mobilePhone/chat/reply/${messageId}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPLIES,
                payload: res.data
            })
        })
}