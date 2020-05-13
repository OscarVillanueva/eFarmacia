import { ADD_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS } from "../types";

export default (state, action) => {
    switch (action.type) {

        case ADD_PRODUCT: {
            localStorage.setItem("products", JSON.stringify( [action.payload, ...state.products] ))
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        }

        case LOAD_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }

        default: return state
    }
};
