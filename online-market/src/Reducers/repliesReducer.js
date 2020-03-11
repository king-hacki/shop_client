
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
            console.log(action.payload)
            return {
                ...state,
                replies: [action.payload, ...state.replies]
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