import React from 'react';

const Shopping = ({ product }) => {

    if( !product || Object.keys(product).length === 0 ) return null

    const { name, price, short_description, images: [ image ] } = product

    // Quitamos <p></p> que vienen por defecto de la API
    const cleanDescription = short_description.replace(/<p>|<\/p>/g, "").slice(0, 50) + "..."

    return ( 
        <>
            <div className="flex justify-around border-gray-400 border-t p-4">

                <div className = "w-1/2 mr-2">
                    <img 
                        className = ""
                        src = {image.src} 
                        alt = "product"
                    />
                </div>

                <div className="flex flex-col justify-between w-1/2">
                    <p className = "text-sm text-gray-800">{name}</p> 
                    <p className = "text-xs text-gray-800">{cleanDescription}</p>
                    <p className = "text-lg text-orange-700 font-black">${price}</p>
                </div>
                
            </div>
        </>
    );
}
 
export default Shopping;