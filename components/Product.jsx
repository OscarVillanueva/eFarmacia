import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import ShoppingListContext from '../context/ShoppingListContext';

const Product = ({ product }) => {

    if(!product || Object.keys(product).length === 0) return null

    const shoppingListContext = useContext(ShoppingListContext)
    const { addProduct } = shoppingListContext

    const { name, description, price, images: [ image ] } = product

    // Quitamos <p></p> que vienen por defecto de la API
    const cleanDescription = description.replace(/<p>|<\/p>/g, "")

    const handleClick = () => {
        addProduct( product )
        Swal.fire(
            'Éxito',
            'Se agregado correctamente al carrito',
            'success'
        )
    }

    return ( 
        <div className = "mb-8 sm:mb-0 shadow-lg rounded">
            <img src= { image.src } alt="product" className = "w-full rounded-t"/>
            <div className="px-6 py-4">
                <p className = "text-center font-black mb-2">{name}</p>
                <p className = "mb-2 leading-relaxed">{cleanDescription}</p>
                <p className = "mb-2 font-bold text-orange-700">${price}</p>
                <button 
                    className = "w-full bg-orange-700 text-gray-200 py-2 px-4 rounded text-center"
                    onClick = { handleClick }
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
 
export default Product;