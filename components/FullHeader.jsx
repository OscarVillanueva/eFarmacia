import React, { useEffect, useContext } from 'react';
import Search from './Search';
import Nav from './Navigation';
import ShoppingListContext from '../context/ShoppingListContext';

const FullHeader = () => {

    const shoppingListContext = useContext(ShoppingListContext)
    const { loadProducts } = shoppingListContext

    useEffect(() => {

        loadProducts()
        
    }, [])

    return ( 
        <div className="">

            <div 
                className = "site-full-header"
            >
                <div className="layer">

                    <Nav position = { true } />

                    <div className="flex flex-col h-screen justify-center items-center">
                        <h1 className = "p-8 sm:p-0 text-center sm:text-left text-gray-200 text-4xl capitalize">
                            siempre contigo,
                            <span className = "font-black text-orange-700 normal-case"> eFarmacia </span>
                        </h1>

                        <Search 
                            margin = "4"
                        />

                    </div>
                </div>
            </div>

            <style jsx>{`
                .site-full-header {
                    background-image: url("/img2.jpg");
                    background-position: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    height: 100vh;
                    position: relative;
                }

                .layer { 
                    background-color: rgba(15, 15, 15, 0.9);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>

        </div>
    );
}
 
export default FullHeader;