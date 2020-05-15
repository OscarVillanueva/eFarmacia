import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import ShoppingListContext from '../context/ShoppingListContext';

const ProductBuy = ({ product }) => {

    if(!product || Object.keys(product).length === 0) return null

    // Context para modificar la orden
    const shoppingListContext = useContext(ShoppingListContext)
    const { updateProduct, deleteProduct, updateTotal } = shoppingListContext

    const { id, name, short_description, price, images: [ image ] } = product

    // Cantidad seleccionada
    const [quantity, setQuantity] = useState(product.quantity)

    // Total en relación con las compras
    const [total, seTotal] = useState(price * product.quantity)

    // Quitamos <p></p> que vienen por defecto de la API
    const cleanDescription = short_description.replace(/<p>|<\/p>/g, "")

    const handleChange = (e) => {
        
        if ( e.target.value > 0 ) {

            // Actualizamos el campo
            setQuantity(Number(e.target.value))

            // Actualizamos el total del producto
            seTotal( Number(e.target.value) * price )

            // Actualizamos el total general
            product.quantity = Number(e.target.value)
            updateProduct( product )
        }
    }

    const handleClick = () => {
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Sacar de la lista!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.value) {

                deleteProduct( id )

            }
        })

    }

    return ( 
        <div className = "border-gray-200 border-t-2 text-gray-800 bg-gray-100 p-3 relative">

            <button 
                type = "button"
                className="absolute right-0 top-0 pt-2 pr-2"
                onClick = { handleClick }
            >
                <svg 
                    fill="none" strokeLinecap="round" 
                    strokeLinejoin="round" strokeWidth="2" stroke="currentColor" 
                    viewBox="0 0 24 24" className = "w-6 h-6 text-red-700">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>

            <div>
                <p className = "text-center font-black uppercase">{name}</p>

                <div className="sm:flex sm:justify-around sm:items-center border-gray-400 border-t p-4">

                    <img 
                        className = "sm:w-1/4 sm:mr-2 mb-2 sm:mb-0"
                        src = {image.src} 
                        alt = "product"
                    />

                    <p 
                        className = "text-xs text-gray-800 sm:w-1/2"
                    >
                        {cleanDescription}
                    </p>
                    
                </div>
            </div>

            <div className = "flex justify-around items-center">
                <p className = "text-gray-800 text-center text-sm">
                    Precio
                    <span 
                        className = "font-black text-orange-700 text-lg block"
                    >
                        ${price}
                    </span>
                </p>

                <form className="flex flex-col w-1/2 ">
                    <label 
                        htmlFor="quantity"
                        className = "text-sm"
                    >
                        Cantidad
                    </label>
                    <input 
                        className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" 
                        name="quantity" 
                        id="quantity"
                        min = "1"
                        value = { quantity }
                        onChange = { handleChange }
                    />
                </form>

                <p className = "text-gray-800 text-center text-sm">
                    Total
                    <span 
                        className = "font-black text-orange-700 text-lg block"
                    >
                    ${total}
                    </span>
                </p>
            </div>

        </div>
    );
}
 
export default ProductBuy;