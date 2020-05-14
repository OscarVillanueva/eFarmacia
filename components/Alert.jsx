import React from 'react';

{/* <div className="flex flex-col h-64 my-24 justify-center items-center"> */}

const Alert = ({ text, width }) => ( 

    <div className = {`flex flex-col items-center shadow bg-gray-200 p-6 rounded h-${width}`}>
        <h1 
            className = "text-gray-800 text-xl sm:text-3xl text-center"
        >
            {text}
        </h1>

        <svg 
            className = 'h-32 w-32 text-orange-700'
            fill="none" strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    </div>
);

 
export default Alert;