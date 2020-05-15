import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import ProductBuy from '../components/ProductBuy';
import Alert from '../components/Alert';
import Shipping from '../components/Shipping';
import ShoppingListContext from '../context/ShoppingListContext';

const WhisList = () => {

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, updateTotal } = shoppingListContext

    useEffect(() => {
        
        updateTotal()

    }, [products])  


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


                <Shipping />
                
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