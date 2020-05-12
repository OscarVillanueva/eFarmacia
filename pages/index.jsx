import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Product from '../components/Product';
import axios from '../config/axios';

const Home = () => {

  const [products, setProducts] = useState([
    { 
      id: 1,
      name: "Producto 1", 
      image: "https://dummyimage.com/400x500/b58bb5/0011ff.png",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ab distinctio aliquid amet in cupiditate? Illo odio labore corporis porro maiores praesentium minima, quibusdam, incidunt molestias modi possimus soluta impedit?",
      price : 20
    },
    { 
      id: 2,
      name: "Producto 2", 
      image: "https://dummyimage.com/400x500/b58bb5/0011ff.png",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ab distinctio aliquid amet in cupiditate? Illo odio labore corporis porro maiores praesentium minima, quibusdam, incidunt molestias modi possimus soluta impedit?",
      price : 20
    },
    { 
      id: 4,
      name: "Producto 3", 
      image: "https://dummyimage.com/400x500/b58bb5/0011ff.png",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ab distinctio aliquid amet in cupiditate? Illo odio labore corporis porro maiores praesentium minima, quibusdam, incidunt molestias modi possimus soluta impedit?",
      price : 20
    }
  ])

  useEffect(() => {
    
    const fetchApi = async () => {
      
      try {

        const { data } = await axios.get("/products?per_page=3")
        console.log(data);

      } catch (error) {
        console.log(error);
      }

    }

    fetchApi()

  }, [])

  return (
    <Layout>
    	<h2 className = "my-4 text-4xl text-gray-800 text-center">
        Más sobre nosotros
      </h2>

      {/* Nosotros */}
      <div className="sm:grid sm:grid-cols-3 sm:col-gap-16 my-6">

        <div className = "mb-12 sm:mb-0">
              <div className = "w-full">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className = "w-32 h-32 mx-auto text-orange-700">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className = "my-2 text-xl text-center font-bold">Seguridad</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam esse corrupti, ut, rem assumenda minus inventore fuga, rerum reprehenderit totam neque est possimus dicta fugit quisquam aperiam eum! Eveniet.
              </p>
        </div>

        <div className = "mb-12 sm:mb-0">
              <div className = "w-full">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className = "w-32 h-32 mx-auto text-orange-700">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className = "my-2 text-xl text-center font-bold">Mejor precio</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam esse corrupti, ut, rem assumenda minus inventore fuga, rerum reprehenderit totam neque est possimus dicta fugit quisquam aperiam eum! Eveniet.
              </p>
        </div>

        <div>
              <div className = "w-full">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className = "w-32 h-32 mx-auto text-orange-700">
                  <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className = "my-2 text-xl text-center font-bold">Calidad</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam esse corrupti, ut, rem assumenda minus inventore fuga, rerum reprehenderit totam neque est possimus dicta fugit quisquam aperiam eum! Eveniet.
              </p>
        </div>

      </div>

      {/* Productos */}
      <h2 className = "my-12 text-4xl text-gray-800 text-center">
        Productos en venta
      </h2>

      <div className="sm:grid sm:grid-cols-3 sm:col-gap-16 mb-10">
        <>
          {products.map(product => (
            
            <Product
              key = { product.id }
              product = { product }
            />

          ))}
        </>
      </div>

      <div className="flex justify-center sm:justify-end mb-12">

        <Link href = "/products">
            <a className = "w-full sm:w-auto bg-orange-700 text-gray-200 py-2 px-4 rounded text-center">
              Ver todos
            </a>
        </Link>

      </div>

      <div className="mb-10">
        <h2 className = "my-12 text-4xl text-gray-800 text-center">
          Total de casos confirmados de Covid 19
        </h2>
        <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" width="100%" height="600px"></iframe>
      </div>

    </Layout>
  )
}

export default Home;