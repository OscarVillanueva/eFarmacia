import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProductBuy from '../components/ProductBuy';
import Alert from '../components/Alert';
import ShoppingListContext from '../context/ShoppingListContext';
import axios from '../config/axios';

const WhisList = () => {

    // Permitir hacer la orden solo si hay productos agregados
    const [allowed, setAllowed] = useState("cursor-not-allowed opacity-50")

    const router = useRouter()

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, total, updateTotal, emptyShoppingList } = shoppingListContext

    useEffect(() => {
        
        updateTotal()

    }, [products])  

    useEffect(() => {
        
        if(total > 0) setAllowed("")
        else setAllowed("cursor-not-allowed opacity-50")

    }, [total])

    const handleClick = async () => {

        const data = prepareData()

        try {
        
            const response = await axios.post("/orders", data)
            const message = `Tu pedido esta en camino, tu orden es el número: ${response.data.id}`
            
            Swal.fire(
                '¡Éxito!',
                message,
                'success'
            )

            router.push("/products")
            emptyShoppingList()

        } catch (error) {
            console.log(error);
        }

    }

    const prepareData = () => {
        const billing = {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US",
            email: "john.doe@example.com",
            phone: "(555) 555-5555"
        }

        const line_items = products.map( ({ id, name, quantity, price }) => {
            return {
                product_id: id,
                name,
                quantity,
                price
            }
        })

        const shipping = {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US"
        }

        const data = {
            payment_method: "cash",
            payment_method_title: "Cash on delivery",
            billing,
            shipping,
            line_items
        }

        return data
    }

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
                        onClick = { handleClick }
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