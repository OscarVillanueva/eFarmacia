import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ShoppingListContext from '../context/ShoppingListContext';

const ShoppingList = ({ full, top }) => {

    // Componente que me indica el color del carrito en pantalla
    const [clasess, setClases] = useState("text-gray-800 w-8 h-8")

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products } = shoppingListContext

    // Una vez cargado el componte, verificar las clases
    useEffect(() => {

        defineCarColor()

        // if(products.length === 0) console.log("No tiene nada");
        // else console.log("Si tiene", products);

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
                        <div 
                            className={`rounded mb-1 p-3 bg-gray-200 text-gray-900 summary 
                            ${top ? "topleft" : "bottomleft"} `}
                        >
                            <h1>Hola</h1>
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
                    
                    width: 10rem;
                
                    /* Position the tooltip */
                    position: absolute;
                    z-index: 9999999999;
                }

                .topleft {
                    top: -1;
                    right: 100%; 
                }

                .bottomleft {
                    top: -120%;
                    right: 100%; 
                }
                
            `}</style>
    
        </>
    );
}
 
export default ShoppingList;