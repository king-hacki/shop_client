import {
    GET_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM
} from '../Actions/types'

const initialState = {
    shoppingCart : null,
    addItem : null,
    total: 0,
    totalPrice: 0
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CART:
            return{
                ...state,
                shoppingCart: action.payload,
                total: action.payload.mobilePhoneList.length,
                totalPrice : action.price
            }
        case ADD_ITEM_TO_CART:
            return{
                ...state,
                total : state.total + 1
            }
        case DELETE_ITEM:
            return{
                ...state,
                total : state.total - 1
            }
        default:
            return state;
    }
}