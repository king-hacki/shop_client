import axios from 'axios'

import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  INVALID_TOKEN,
  GET_ALL_USERS
} from './types'

import {getShoppingCart} from './cartActions'

import { toast } from 'react-toastify';
            

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

<<<<<<< HEAD
    axios
        .get("http://localhost:8080/api/auth/loadUser", tokenConfig(getState))
        .then(res=> {
=======
    console.log(getState().productReducer);
    console.log(getState().userReducer);
    axios
        .get("http://localhost:8080/api/auth/loadUser", tokenConfig(getState))
        .then(res=> {
            console.log(res.data)
>>>>>>> 91376e82dfe44dcb866a581e907b8d6936109ff5
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            if(err.response.status === 400 && err.response.data.code === "expired jwt token"){
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
            dispatch(getShoppingCart())
        })
        .catch(err => {
            toast.error(JSON.stringify("Invalid password or login"))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const registerUser = ({username,firstName, lastName, email, password}) => dispatch => {
    const config = {
            headers : {
            "Content-Type" : "application/json"
        }
    };

    const body = JSON.stringify({username,firstName, lastName, email, password});

    axios
        .post("http://localhost:8080/api/auth/signUp", body, config)
        .then(res => {
            toast.success("You registered successfully");
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>{
            Object.values(err.response.data).map(message => {
                toast.error(message , {
                    position: toast.POSITION.TOP_RIGHT
                })
            });
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


    export const logout = () => dispatch => {
        dispatch({
        type: LOGOUT_SUCCESS
        });
    };


    export const getAllUsers = () => (dispatch, getState) => {
        axios
            .get('http://localhost:8080/api/auth/allUsers', tokenConfig(getState))
            .then(res => {
               dispatch({
                   type: GET_ALL_USERS,
                   payload: res.data
               })
            })
    }

    export const tokenConfig = getState => {
        const accessToken = getState().userReducer.accessToken;

        const config = {
            headers : {
                "Content-type" : "application/json",
            }
        };

        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    }

    export const savePhoto = imageFile => (dispatch, getState) => {

        const config = tokenConfig(getState)

        config.headers["Content-type"] = "multipart/form-data"

        const formData = new FormData();
        formData.append('imageFile' , imageFile);

        axios
            .post("http://localhost:8080/api/auth/savePhoto", formData, config)
            .then(res=>{
                dispatch(loadUser())
                toast.success("Photo save successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }

    export const changeAccount = (username, email,password, newPassword) => (dispatch, getState) => {
        const dataAccount = {
            "username" : username,
            "email" : email,
            "password" : password + "-" + newPassword,
        }

        axios
            .post("http://localhost:8080/api/auth/changeAccount", dataAccount, tokenConfig(getState))
            .then(res => {
                toast.success("Changes saved successfully, please reenter in account", {
                    position : toast.POSITION.BOTTOM_RIGHT
                });
                
            })
    }