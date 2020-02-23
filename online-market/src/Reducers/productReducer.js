import { GET_ALL_ITEMS, CREATE_ITEM, GET_ITEM, GET_CHAT } from "../Actions/types";

const initState = {
    items: [],
    addedItems: [],
    total: 0, 
    item: {}
}

export default function(state = initState, action){
    switch(action.type){
        case GET_ALL_ITEMS:
            // console.log("Hello from reducer")
            console.log(action.payload)
            return{
                ...state,
                items: action.payload
            }
        case CREATE_ITEM:
            console.log(action.payload)
            return{
                ...state,
                addedItems: action.payload
            }
        case GET_ITEM:   
            console.log(action.payload)
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}
