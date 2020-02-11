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
  INVALID_TOKEN,
} from './types'

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios
        .get("http://localhost:8080/api/auth/loadUser", tokenConfig(getState))
        .then(res=>{
            console.log(res.data)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            if(err.response.status == 400 && err.response.data.code == "expired jwt token"){
                dispatch({
                    type: INVALID_TOKEN
                })
            }else{
                dispatch({
                    type: AUTH_ERROR
                })
            }
        }
        )
}


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
            dispatch(loadUser())
            console.log(res.data)
        })
}

export const registerUser = ({username, email, password}) => dispatch => {
    const config = {
            headers : {
            "Content-Type" : "application/json"
        }
    };

    const body = JSON.stringify({username, email, password});

    axios
        .post("http://localhost:8080/api/auth/signUp", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })

        .catch(err =>{
            // dispatch(returnsErrors)
        })
}

    export const tokenConfig = getState => {
        const accessToken = getState().userReducer.accessToken;

        console.log("ACCESS TOKEN: " + accessToken);

        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        };

        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    }
    