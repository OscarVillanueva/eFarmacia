import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import ShoppingListContext from '../context/ShoppingListContext';
import FullHeader from './FullHeader';
import Nav from './Navigation';

const Layout = ({ children }) => {

    // Para el logo de eFarmacia
    const router = useRouter()

    // Cargar el carrito de compras
    const shoppingListContext = useContext(ShoppingListContext)
    const { loadProducts } = shoppingListContext

    useEffect(() => {

        loadProducts()
        
    }, [])

    return ( 
        <>
            <Head>
                <title>eFarmacia</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>


            <header>
                { router.pathname === "/" 
                    ? (
                        <FullHeader />
                    ) 
                    : (
                        <Nav full top/>
                    )
                }
            </header>


            <main className="w-4/5 mx-auto">
                { children }
            </main>

            <footer>
                <Nav full />
                <p className = "py-4 bg-gray-200 text-center mb-0">
                    Todos los derechos reservados &copy; 
                    { " " + new Date().getFullYear() }
                </p>
            </footer>

        </>
    );
}
 
export default Layout;