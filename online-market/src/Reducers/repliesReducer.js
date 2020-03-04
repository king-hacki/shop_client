
import {
        POST_REPLY,
        GET_REPLIES
    } from "../Actions/types"

const initialState = {
    replies: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_REPLY:
            return {
                ...state
                //  TODO
            }    
        
        case GET_REPLIES: 
            return {
                ...state,
                replies: action.payload    
            }    

        default:
            return { 
                ...state
            } 
    }
}