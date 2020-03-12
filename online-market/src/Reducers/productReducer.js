import { GET_ALL_ITEMS, CREATE_ITEM, GET_ITEM, GET_ALL_ITEMS_PAGE } from "../Actions/types";


const initState = {
    items: [],
    addedItems: [],
    pageItems: [],
    totalPages: 0,
    item: null

}

export default function(state = initState, action){
    switch(action.type){
        case GET_ALL_ITEMS:
            return{
                ...state,
                items: action.payload
            }
        case GET_ALL_ITEMS_PAGE:
            return{
                ...state,
                pageItems: action.payload.content,
                totalPages: action.payload.totalPages
            }
        case CREATE_ITEM:
            return{
                ...state,
                addedItems: action.payload
            }
        case GET_ITEM:   
            return {
                ...state,
                item: action.payload
            }
        default:
            return{
                ...state
            }
    }
}
