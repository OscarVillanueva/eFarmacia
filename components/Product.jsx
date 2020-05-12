import React from 'react';

const Product = ({ product }) => {

    if(!product || Object.keys(product).length === 0) return null

    const { id, name, description, price, images: [ image ] } = product


    return ( 
        <div className = "mb-8 sm:mb-0 shadow-lg rounded">
            <img src= { image.src } alt="product" className = "w-full rounded-t"/>
            <div className="px-6 py-4">
                <p className = "text-center font-black mb-2">{name}</p>
                <p className = "mb-2 leading-relaxed">{description}</p>
                <p className = "mb-2 font-bold text-orange-700">${price}</p>
                <button className = "w-full bg-orange-700 text-gray-200 py-2 px-4 rounded text-center">
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
 
export default Product;