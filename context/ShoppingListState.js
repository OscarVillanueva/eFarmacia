import React, { useReducer } from 'react';
import WhishListReducer from './ShoppingListReducer';
import WhishListContext from './ShoppingListContext';
import { ADD_PRODUCT, LOAD_PRODUCTS, DELETE_PRODUCT } from '../types';

const ShoppingListState = ({ children }) => {

    const initialState = {
        products: [],
        client: {},
        total: 0
    }

    const [state, dispatch] = useReducer(WhishListReducer, initialState)

    // Agregar un producto al Carrito de compras
    const addProduct = product => {

        if( !state.products.includes(product) ) {

            let products = [ product, ...state.products ]
            localStorage.setItem("products", JSON.stringify( products ))
    
            dispatch({
                type: ADD_PRODUCT,
                payload: product
            })
        }
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
            payload: products ? products : []
        })

    }

    // Borrar un producto del carrito
    const deleteProduct = id => {
        
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        })

    }

    return ( 
        <WhishListContext.Provider
            value = {{
                products: state.products,
                total: state.total,
                addProduct,
                deleteProduct,
                loadProducts
            }}
        >
            { children }
        </WhishListContext.Provider>
    );
}
 
export default ShoppingListState;