
import {
    GET_CHAT,
    POST_CHAT
 } from "../Actions/types";

 const initialState = {
     comments: [],
     isAdded: false,
     addedComent: ""
 }

 export default function (state = initialState, action) {
     switch(action.type) {
        case GET_CHAT:
             return {
                 ...state,
                 comments: action.payload
             }
        case POST_CHAT:
            //  end here 
            //  TODO add to message to comments array
            return {
                ...state,
                addedComent: action.payload.message,
                isAdded: true
            }
            
        default:
            return state;

     }
 }