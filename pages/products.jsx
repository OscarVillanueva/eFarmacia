import React, { useState, useEffect, useRef } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Layout from '../components/Layout';
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import axios from '../config/axios';

const Products = () => {

    const [products, setProducts] = useState([])
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    // Me guarda una referencia de un Nodo en especifico, como un querySelector
    const title = useRef(null)

    useEffect(() => {
        
        const fetchApi = async () => {
        
            try {

                // Mostramos el spinner
                setLoading(true)

                // hacemos la consulta
                const api = `/products?page=${currentPage}&stock_status=instock&per_page=12`
                const response = await axios.get(api)

                // Ocultamos el spinner y mostramos los datos
                setLoading(false)
                setProducts(response.data)

                // Hacemos el scroll hacia arriba
                title.current.scrollIntoView({ behavior: "smooth" });

                // Recogemos la cantidad de paginas 
                setPages(Number(response.headers["x-wp-totalpages"]));

            } catch (error) {
                console.log(error);
            }

        }

        fetchApi()

    }, [currentPage])
 

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
                ) 
            }



        </Layout>
    );
}
 
export default Products;