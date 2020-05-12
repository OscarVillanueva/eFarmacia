import React from 'react';

const Search = ({ margin }) => {
    return ( 
        <form className = {`w-11/12 sm:w-3/5 mb-4 sm:mb-0 sm:mt-${margin} relative`}>
            <input 
                className = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white"
                type="text" 
                name="search" 
                id="search"
                placeholder = "Buscar producto . . ."
            />

            <button 
                type="submit"
                className = "absolute top-0 right-0 p-3 bg-orange-700 rounded-r text-gray-200 flex justify-center items-center"
            >
                {/* Buscar */}
                <svg fill="currentColor" viewBox="0 0 20 20" className = "w-6 h-6">
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
            </button>
        </form>
    );
}
 
export default Search;