import { ADD_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS } from "../types";

export default (state, action) => {
    switch (action.type) {

        case ADD_PRODUCT: {
            
            return {
                ...state,
                products: [action.payload, ...state.products],
                // total: state.total + Number(action.payload.price)
            }
        }

        case LOAD_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }

        case DELETE_PRODUCT: {
            return { 
                ...state,
                products: state.products.filter( product => product.id !== action.payload )
            }
        }

        default: return state
    }
};
