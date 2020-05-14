import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import ProductBuy from '../components/ProductBuy';
import Alert from '../components/Alert';
import ShoppingListContext from '../context/ShoppingListContext';

const WhisList = () => {

    // Permitir hacer la orden solo si hay productos agregados
    const [allowed, setAllowed] = useState("cursor-not-allowed opacity-50")

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, total, updateTotal } = shoppingListContext

    useEffect(() => {
        
        updateTotal()

    }, [products])  

    useEffect(() => {
        
        if(total > 0) setAllowed("")
        else setAllowed("cursor-not-allowed opacity-50")

    }, [total])

    return (
        <Layout>
            <h1 
                className = "my-4 text-4xl text-gray-800 text-center mb-8"
            >
                Comprar
            </h1>

            <div className="sm:grid sm:grid-cols-2 mb-10 justify-items-center min-height-19">

                { products.length === 0 
                    ? ( 
                        <Alert 
                            text = "Aún hay productos en el carrito"
                            width = { 40 }
                        />
                    ) 
                    : (
                        <div>
                            {products.map(product => (
                                <ProductBuy 
                                    key = { product.id }
                                    product = { product }
                                />
                            ))}
                        </div>
                    )
                }

                <div 
                    className = "flex flex-col justify-center items-center w-full sm:max-w-sm bg-gray-200 rounded shadow p-6 h-40"
                >
                    <p className = "text-gray-800 text-lg mb-3">
                        Total a pagar: 
                        <span 
                            className = "font-black text-orange-700 text-2xl ml-2"
                        >
                            ${total}
                        </span>
                    </p>

                    <button
                        type = "button"
                        className = {`bg-orange-700 text-gray-200 px-4 py-2 rounded w-full font-black uppercase ${allowed}`}
                    >
                        Hacer pedido
                    </button>
                </div>
            </div>

            <style jsx>{`
                .justify-items-center {
                    justify-items: center;
                }

                .min-height-19 {
                    min-height: 19rem;
                }
            `}</style>

        </Layout>
    );
}
 
export default WhisList;