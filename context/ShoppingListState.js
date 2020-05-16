import React, { useReducer, useContext } from 'react';
import WhishListReducer from './ShoppingListReducer';
import WhishListContext from './ShoppingListContext';
import firebase from '../firebase/firebase';
import FirebaseContext from '../firebase/context';
import { 
    ADD_PRODUCT, 
    LOAD_PRODUCTS,
    DELETE_PRODUCT, 
    UPDATE_TOTAL, 
    UPDATE_PRODUCT, 
    EMPTY_CART 
} from '../types';

const ShoppingListState = ({ children }) => {

    const initialState = {
        products: [],
        total: 0
    }

    const [state, dispatch] = useReducer(WhishListReducer, initialState)

    // Context para sacar el currentUser
    const firebaseContext = useContext( FirebaseContext )
    const { currentUser } = firebaseContext

    // Agregar un producto al Carrito de compras
    const addProduct = product => {

        const exists = state.products.find( previos => previos.id === product.id )

        if( !exists ) {

            // Agregamos el producto
            let products = [ product, ...state.products ]

            // Agreamos en localStorage
            localStorage.setItem("products", JSON.stringify( products ))

            // Actulizamos el carrito en firebase
            updateFirebase( products )
    
            dispatch({
                type: ADD_PRODUCT,
                payload: product
            })
        }
    }

    // Cargar los productos
    const loadProducts = () => {

        if ( !currentUser ){
            console.log("desde lcoal");
            const products = JSON.parse(localStorage.getItem("products"))

            dispatch({
                type: LOAD_PRODUCTS,
                payload: products ? products : []
            })
        }
        else
            fetchShoppingListFromFirebase()
    }

    // Borrar un producto del carrito
    const deleteProduct = id => {
        
        // Eliminamos
        const products = state.products.filter( product => product.id !== id )

        // Cargamos
        localStorage.setItem("products", JSON.stringify( products ))

        // Actulizamos el carrito en firebase
        updateFirebase( products )

        dispatch({
            type: DELETE_PRODUCT,
            payload: products
        })

    }

    // Actualizar la cantidad de un producto
    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        })
    }

    // Actualizar un producto
    const updateProduct = product => {

        // Actualizamos
        const products = state.products.map( current => current.id === product.id 
            ? product : current)

        // Cargamos
        localStorage.setItem("products", JSON.stringify( products ))

        // Actulizamos el carrito en firebase
        updateFirebase( products )

        dispatch({
            type: UPDATE_PRODUCT,
            payload: products
        })
    }

    // Vaciar el carrito de compra
    const emptyShoppingList = () => {

        // Eliminar de localStorage
        localStorage.removeItem("products")

        // Borrar de firebase
        firebase.deleteDocument("shoppingCar", currentUser.uid)

        dispatch({
            type: EMPTY_CART,
        })
    }

    // Actualizar firebase
    const updateFirebase = products => {

        if ( currentUser ) 
            firebase.addDocument("shoppingCar", currentUser.uid, { shoppingList: products}, true)

    }

    // Descargar el carrito de firebase
    const fetchShoppingListFromFirebase = () => {

        firebase.db.collection("shoppingCar").onSnapshot( snapShot => {

            const products = snapShot.docs.map(doc => {
                return {
                    ...doc.data()
                }
            })

            let productList = []

            if(products.length > 0) {
                productList = products[0].shoppingList
            }

            dispatch({
                type: LOAD_PRODUCTS,
                payload: productList 
            })

        })

    }

    return ( 
        <WhishListContext.Provider
            value = {{
                products: state.products,
                total: state.total,
                addProduct,
                deleteProduct,
                updateProduct,
                loadProducts,
                updateTotal,
                emptyShoppingList
            }}
        >
            { children }
        </WhishListContext.Provider>
    );
}
 
export default ShoppingListState;