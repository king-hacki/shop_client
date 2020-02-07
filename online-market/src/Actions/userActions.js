import axios from 'axios'

import {
  USER_LOADED,
  USER_LOADING,
  GET_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types'

export const loginUser = (username,password) => dispatch => {
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    };
    const body = JSON.stringify({username, password});

    axios
        .post("http://localhost:8080/api/auth/signIn", body,config)
        .then(res =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data   
            })
        })
}