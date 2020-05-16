import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup  from 'yup';
import axios from '../config/axios';
import ShoppingListContext from '../context/ShoppingListContext';
import FirebaseContext from '../firebase/context';

const Shipping = () => {

    // Permitir hacer la orden solo si hay productos agregados
    const [allowed, setAllowed] = useState("cursor-not-allowed opacity-50")

    // Importamos el context con los productos
    const shoppingListContext = useContext(ShoppingListContext)
    const { products, total, emptyShoppingList } = shoppingListContext

    // Sacamos el usuario logeado
    const firebaseContext = useContext( FirebaseContext )
    const { currentUser } = firebaseContext

    const router = useRouter()

    // Validación del formulario
    const formik = useFormik({
        initialValues: {
            address_1: "",
            city: "",
            state: "",
            postcode: "",
        },
        validationSchema: Yup.object({
            address_1: Yup.string().required("Dedes indicar una dirección")
                .trim("Dedes indicar una dirección"),
            city: Yup.string().required("Debes indicar tu cuidad")
                .trim("Debes indicar tu cuidad"),
            state: Yup.string().required("Debes indicar tu estado")
                .trim("Debes indicar tu estado"),
            postcode: Yup.string().required("Debes indicar tu código postal")
                .trim("Debes indicar tu código postal"),
        }),
        onSubmit: values => {
            sendOrder( values )
        }
    })

    useEffect(() => {
        
        if(total > 0) setAllowed("")
        else setAllowed("cursor-not-allowed opacity-50")

    }, [total])


    const sendOrder = async ( shipping ) => {

        const [ first_name, last_name ] = currentUser.displayName.split(" ")

        const data = prepareData({
            ...shipping, 
            address_2: "",
            first_name,
            last_name,
        })
        // console.log(data);

        try {
        
            const response = await axios.post("/orders", data)
            const message = `Tu pedido esta en camino, tu orden es el número: ${response.data.id}`
            
            Swal.fire(
                '¡Éxito!',
                message,
                'success'
            )

            emptyShoppingList()
            router.push("/products")

        } catch (error) {
            console.log(error);
        }
    }

    const prepareData = ( shipping ) => {
        const billing = {
            first_name: "John",
            last_name: "Doe",
            ...shipping,
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

        <div className="mt-8 sm:mt-0 flex flex-col items-center w-full sm:max-w-sm rounded shadow bg-gray-100">
            
            <h1 className = "text-gray-800 mt-2 text-lg font-bold uppercase">Datos de la entrega</h1>

            <form 
                className = "w-full"
                onSubmit = { formik.handleSubmit }
            >
    
                <div 
                    className = "flex flex-col justify-center items-center w-full sm:max-w-sm p-6"
                >
                    
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Dirección de entrega
                        </label>
        
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="address_1" 
                            type="text" 
                            placeholder="Dirección"
                            value = { formik.values.address_1 }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    {(formik.touched.address_1 && formik.errors.address_1) && (
                        <div className = "w-full my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.address_1}</p>
                        </div>
                    )}

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            Cuidad
                        </label>
        
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="city" 
                            type="text" 
                            placeholder="Cuidad"
                            value = { formik.values.city }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    {(formik.touched.city && formik.errors.city) && (
                        <div className = "w-full my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.city}</p>
                        </div>
                    )}

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                            Estado
                        </label>
        
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="state" 
                            type="text" 
                            placeholder="Estado"
                            value = { formik.values.state }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    {(formik.touched.state && formik.errors.state) && (
                        <div className = "w-full my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.state}</p>
                        </div>
                    )}

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postcode">
                            Código postal
                        </label>
        
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="postcode" 
                            type="text" 
                            placeholder="Código Postal"
                            value = { formik.values.postcode }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    {(formik.touched.postcode && formik.errors.postcode) && (
                        <div className = "w-full my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.postcode}</p>
                        </div>
                    )}

                </div>
    
                <div 
                    className = "flex flex-col justify-center items-center w-full sm:max-w-sm bg-gray-200 p-6 h-40"
                >
        
                    <p className = "text-gray-800 text-lg mb-3 text-center">
                        Total a pagar: 
                        <span 
                            className = "font-black text-orange-700 text-2xl ml-2"
                            >
                            ${total}
                        </span>
                    </p>
        
                    <button
                        type = "submit"
                        className = {`bg-orange-700 text-gray-200 px-4 py-2 rounded w-full font-black uppercase ${allowed}`}
                        // onClick = { handleClick }
                    >
                        Hacer pedido
                    </button>
        
                </div>
            </form>
        </div>

    );
}
 
export default Shipping;