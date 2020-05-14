import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Shopping from './Shopping';
import ShoppingListContext from '../context/ShoppingListContext';

const ShoppingList = ({ full }) => {

    // Componente que me indica el color del carrito en pantalla
    const [clasess, setClases] = useState("text-gray-800 w-8 h-8")

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, total } = shoppingListContext

    // Una vez cargado el componte, verificar las clases
    useEffect(() => {

        defineCarColor()

    }, [products])

    // Función para definir el color del carrito
    const defineCarColor = () => {

        switch (true) {
            // Si tiene y esta completo
            case products.length > 0 && full:
                setClases("text-orange-700 w-8 h-8")
                break;

            // No tiene y esta completo
            case products.length === 0 && full:
                setClases("text-gray-700 w-8 h-8")
                break;

            // Si tiene y no esta completo
            case products.length > 0 && !full:
                setClases("text-orange-600 w-6 h-6")
                break;
        
            // No tiene y no esta completo
            case products.length === 0 && !full:
                setClases("text-gray-200 w-6 h-6")
                break;
        }

    }

    return ( 
        <>
            <div className="car">
                    <Link href = "/wishlist" >
                        <a>
                            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" 
                            className = {clasess}>
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </a>
                    </Link>

                    { products.length > 0 && (

                        <div className = "rounded summary">
                            <div 
                                className = 'rounded-t p-3 bg-gray-200'
                            >
                                <h1
                                    className = "text-gray-800 mb-2 font-black uppercase"
                                >
                                    Carrito de compras
                                </h1>
    
                                {products.map(product => (
                                    <Shopping
                                        key = {product.id}
                                        product = { product }
                                    />
                                ))}
    
                            </div>
                            
                            <div 
                                className = "border-gray-400 border-t p-4 bg-gray-400 rounded-b"
                            >
                                <Link href = "/wishlist">
                                    <a 
                                        className = "px-4 py-2 w-full bg-orange-700 block rounded text-gray-200"
                                    >
                                        ¡Comprar!
                                    </a>
                                </Link>
                            </div>
                        </div>
                        
                    )}


            </div>


            <style jsx>{`

                .car {
                    position: relative;
                }

                .car .summary {
                    display: none;
                }

                .car:hover .summary {
                    display: block;
                }

                .summary {
                    width: 120px;
                    text-align: center;
                    
                    width: 20rem;

                    top: 60%;
                    right: 80%; 
                
                    /* Position the tooltip */
                    position: absolute;
                    z-index: 9999999999;
                }

                .h-70 {
                    height: 35rem;
                }

            `}</style>
    
        </>
    );
}
 
export default ShoppingList;