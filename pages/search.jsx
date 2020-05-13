import React, { useState, useEffect, useRef } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from '../config/axios';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Product from '../components/Product';

const Search = () => {

    // Obtenemos la busqueda de la URL
    const router = useRouter()
    const { query: { q } } = router

    // Evitar que se haga la doble petición
    const [queryChange, setQueryChange] = useState(true)

    // State de los productos
    const [products, setProducts] = useState([])

    // State del paginador
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    // Spinner
    const [loading, setLoading] = useState(true)

    // Me guarda una referencia de un Nodo en especifico, como un querySelector
    const title = useRef(null)

    useEffect(() => {
        
        // Indicamos que se cambio el query para evitar que se ejecute, el effect de page
        setQueryChange(true)
        
        // Cambiamos el page para que inicie desde la 1
        setCurrentPage(1)

        // Traemos los datos
        fetchApi(q, 1)

        // Indicamos que ya podemos usar el paginador
        setQueryChange(false)

    }, [q])

    useEffect(() => {

        // Prevenimos una doble consulta proveniente del effect de arriba
        if(!queryChange)
            fetchApi(q, currentPage)

    }, [currentPage])

    const fetchApi = async (query, page) => {
            
        if( query ) {

            // Mostramos el spinner
            setLoading(true)

            const api = `/products?search=${query}&page=${page}&stock_status=instock&per_page=12`
            const response = await axios.get(api)
            
            // Ocultamos el spinner y mostramos los datos
            setLoading(false)
            setProducts(response.data)

            // Hacemos el scroll hacia arriba
            title.current.scrollIntoView({ behavior: "smooth" });

            // Recogemos la cantidad de paginas 
            setPages(Number(response.headers["x-wp-totalpages"]));

        }

    }

    return ( 
        <Layout>

            {/* referenciamos a este h1 a querySelector -> querySelector("h1"), como la parte de adentro del querySelector */}
            <Link href = "/products">
                <a
                    className = "block my-4 text-4xl text-gray-800 text-center"
                    ref = { title }
                >
                    Productos
                </a>
            </Link>

            { loading 
                ? (
                    <div className="flex flex-col h-screen justify-center items-center">
                        <Spinner />
                    </div>
                ) 
                : (
                    <>
                        { products.length > 0
                            ? (
                                <>
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-16 mb-10">
                                        <>
                                            {products.map(product => (
                                                
                                                <Product
                                                    key = { product.id }
                                                    product = { product }
                                                />
                        
                                            ))}
                                        </>
                                    </div>
                        
                                    <div className="flex justify-center sm:justify-end my-12">
                                        <Pagination 
                                            showFirstButton 
                                            showLastButton 
                                            count={pages} 
                                            page = {currentPage}
                                            onChange = { e => setCurrentPage(Number(e.target.textContent)) }
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col h-64 my-24 justify-center items-center">
                                    <div className = "flex flex-col items-center shadow-lg bg-gray-200 p-6 rounded">
                                        <h1 
                                            className = "text-gray-800 text-3xl"
                                        >
                                            No se encontrarón coincidencias
                                        </h1>
    
                                        <svg 
                                            className = "h-32 w-32 text-orange-700"
                                            fill="none" strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            )
                        }
                    </>
                ) 
            }



        </Layout>
    );
}
 
export default Search;