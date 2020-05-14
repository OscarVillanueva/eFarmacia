import React, { useState, useContext } from 'react';
import ShoppingListContext from '../context/ShoppingListContext';

const ProductBuy = ({ product }) => {

    if(!product || Object.keys(product).length === 0) return null

    // Cantidad seleccionada
    const [quantity, setQuantity] = useState(1)

    // Context para modificar la orden
    const shoppingListContext = useContext(ShoppingListContext)
    const { updateQuantity, deleteProdut } = shoppingListContext

    const { id, name, short_description, price, images: [ image ] } = product

    // Total en relación con las compras
    const [total, seTotal] = useState(price)

    // Quitamos <p></p> que vienen por defecto de la API
    const cleanDescription = short_description.replace(/<p>|<\/p>/g, "")

    const handleChange = (e) => {
        
        if ( e.target.value > 0 ) {
            setQuantity(Number(e.target.value))
            seTotal( Number(e.target.value) * price )
        }

    }

    return ( 
        <div className = "border-gray-200 border-t-2 text-gray-800 bg-gray-100 p-3 relative">

            <div className="absolute right-0 top-0 pt-2 pr-2">
                <svg 
                    fill="none" strokeLinecap="round" 
                    strokeLinejoin="round" strokeWidth="2" stroke="currentColor" 
                    viewBox="0 0 24 24" className = "w-6 h-6 text-red-700 cursor-pointer">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>

            <div>
                <p className = "text-center font-black uppercase">{name}</p>

                <div className="flex justify-around items-center border-gray-400 border-t p-4">

                    <img 
                        className = "w-1/4 mr-2"
                        src = {image.src} 
                        alt = "product"
                    />

                    <p 
                        className = "text-xs text-gray-800 w-1/2"
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