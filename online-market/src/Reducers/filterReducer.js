import {GET_FILTERS, FILTERED} from '../Actions/types'

const initState = {
    filters: null,
    filtered: false,
    filterBrands: null,
    price: 0
}

export default function(state = initState, action){
    switch(action.type){
        case GET_FILTERS:
            return{
                ...state,
                filters: action.payload
            }
        case FILTERED:
            return{
                ...state,
                filtered: true,
                price: action.payload.priceRange,
                filterBrands: action.payload.brands
            }
        default:
            return state
    }
}