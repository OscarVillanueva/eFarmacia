import React, { useState, useEffect, useRef } from 'react';
import Pagination from '@material-ui/lab/Pagination';
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
        
        fetchApi(q, 1)

    }, [q])

    useEffect(() => {

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
            <h1 
                className = "my-4 text-4xl text-gray-800 text-center"
                ref = { title }
            >
                Productos
            </h1>

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
                                    <h1 
                                        className = " shadow-lg text-gray-800 text-3xl bg-gray-200 p-6 rounded"
                                    >
                                        No se encontrarón coincidencias
                                    </h1>
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