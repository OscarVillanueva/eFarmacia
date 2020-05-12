import React from 'react';
import Link from 'next/link';
import Search from './Search';

const Nav = ({ full }) => {

    return ( 
        <div
             className = {`flex flex-col sm:flex-row items-center p-4  
                ${ full ? 'bg-gray-100 justify-around' : 'w-full sm:w-4/5 mx-auto justify-end'}`}
        >

            { full &&  (
                <>
                    <Link href = "/">
                        <a className = "p-4 mr-2 text-2xl text-gray-800 text-orange-700 font-black">
                            eFarmacia
                        </a>
                    </Link>
    
                    <Search margin = "0" />
                </>
            )}

            <div className = "flex items-center">
                <Link href = "/login" >
                    <a 
                        className = { `py-2 px-4 text-center mr-2 
                        ${ full ? 'bg-gray-200  text-gray-800 rounded' : 'text-gray-200'}` }>
                        Login
                    </a>
                </Link>
                <Link href = "/signup" >
                    <a 
                        className = { `py-2 px-4 text-center mr-2 
                        ${ full ? 'bg-orange-700 text-gray-200 rounded' : 'text-gray-200'}` }>
                        Registro
                    </a>
                </Link>

                <Link href = "/wishlist" >
                    <a>
                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" 
                        className = {`${ full ? 'text-gray-800 w-8 h-8' : 'text-gray-200 w-6 h-6'}`}>
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </a>
                </Link>
            </div>

        </div>

    );
}
 
export default Nav;