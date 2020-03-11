import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_ALL_USERS,
    INVALID_TOKEN
} from "../Actions/types"

const initialState = {
    accessToken : localStorage.getItem("access"),
    isLoading: false,
    isAuthenticated: false,
    userRegistered: false,
    role: "user",
    user: null,
    users: []
}



export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("access", action.payload.token);
            // console.log(state);
            // console.log(action);    
            return{
                ...state,
                ...action.payload,
                accessToken: action.payload.token,
                isAuthenticated: true,
                role: action.payload.roles[0]
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                role: action.payload.authorities[0].authority
            }       
        case REGISTER_SUCCESS:
            return{
                ...state,
                userRegistered: true,
                isLoading: false
            } 
        case GET_ALL_USERS:
            // console.log(action.payload)
            return{
                ...state,
                users: action.payload
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case INVALID_TOKEN:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("access");
            return{
                ...state,
                accessToken: null,
                isLoading: false,
                isAuthenticated: false,
                userRegistered: false,
                role: "user",
                user: null
            }
        default:
            // console.log("Hello from default");
            // console.log(state)
            return state;
    }
}