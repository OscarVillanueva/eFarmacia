import React, { useReducer } from 'react';
import WhishListReducer from './ShoppingListReducer';
import WhishListContext from './ShoppingListContext';
import { ADD_PRODUCT, LOAD_PRODUCTS } from '../types';

const ShoppingListState = ({ children }) => {

    const initialState = {
        products: [],
        client: {},
        total: 0
    }

    const [state, dispatch] = useReducer(WhishListReducer, initialState)

    // Agregar un producto al Carrito de compras
    const addProduct = (product) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: product
        })
    }

    // Cargar los productos
    const loadProducts = () => {
        let products = []

        if ( Object.keys(state.client).length === 0 || !state.client)
            products = JSON.parse(localStorage.getItem("products"))
        else
            products = [] // descargar de firebase

        dispatch({
            type: LOAD_PRODUCTS,
            payload: products
        })

    }

    return ( 
        <WhishListContext.Provider
            value = {{
                products: state.products,
                total: state.total,
                addProduct,
                loadProducts
            }}
        >
            { children }
        </WhishListContext.Provider>
    );
}
 
export default ShoppingListState;