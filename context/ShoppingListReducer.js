import { ADD_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS, UPDATE_TOTAL, UPDATE_PRODUCT } from "../types";

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
                products: action.payload
            }
        }

        case UPDATE_TOTAL: {
            return {
                ...state,
                total: state.products.reduce((previous ,product) => 
                                            previous += product.price * product.quantity, 0)
            }
        }

        case UPDATE_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }

        default: return state
    }
};
