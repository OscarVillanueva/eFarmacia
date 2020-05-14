import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import ProductBuy from '../components/ProductBuy';
import ShoppingListContext from '../context/ShoppingListContext';

const WhisList = () => {

    // Permitir hacer la orden solo si hay productos agregados
    const [allowed, setAllowed] = useState("cursor-not-allowed opacity-50")

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, total } = shoppingListContext

    useEffect(() => {
        
        if(total > 0) setAllowed("")
        else setAllowed("cursor-not-allowed opacity-50")

    }, [total])

    if (products.length === 0) {
        <Layout>
            <div className="flex flex-col h-64 my-24 justify-center items-center">
                <div className = "flex flex-col items-center shadow-lg bg-gray-200 p-6 rounded">
                    <h1 
                        className = "text-gray-800 text-3xl"
                    >
                        Aún tienes, agregado ningun producto
                    </h1>

                    <svg 
                        className = "h-32 w-32 text-orange-700"
                        fill="none" strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
        </Layout>
    }

    return (
        <Layout>
            <h1 
                className = "my-4 text-4xl text-gray-800 text-center mb-8"
            >
                Comprar
            </h1>

            <div className="sm:grid sm:grid-cols-2 mb-10 justify-items-center">
                <div>
                    {products.map(product => (
                        <ProductBuy 
                            key = { product.id }
                            product = { product }
                        />
                    ))}
                </div>
                <div 
                    className = "flex flex-col justify-center items-center w-full sm:max-w-sm bg-gray-200 rounded shadow p-6 h-40"
                >
                    <p className = "text-gray-800 text-lg mb-3">
                        Total: 
                        <span 
                            className = "font-black text-orange-700 text-2xl ml-2"
                        >
                            ${total}
                        </span>
                    </p>

                    <button
                        type = "button"
                        className = {`bg-orange-700 text-gray-200 px-4 py-2 rounded w-full font-black uppercase cursor-not-allowed opacity-50 ${allowed}`}
                    >
                        Hacer pedido
                    </button>
                </div>
            </div>

            <style jsx>{`
                .justify-items-center {
                    justify-items: center;
                }
            `}</style>

        </Layout>
    );
}
 
export default WhisList;