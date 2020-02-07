import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../Actions/types"

const initialState = {
    accessToken : localStorage.getItem("access"),
    isAuthenticated: false,
    role: "user",
    user: null
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log(action.payload)    
            return{
                ...state,
                isAuthenticated: true
            }
        default:
            return state;
    }
}