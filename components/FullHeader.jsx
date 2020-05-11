import React from 'react';

const FullHeader = () => {
    return ( 
        <div className="">

            <div 
                className = "site-full-header"
            >
                <div className="layer">
                    <p>Header</p>
                    <div className="flex flex-col h-screen justify-center items-center">
                        <h1 className = "text-gray-200">Te sientes mal . . . </h1>
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
                    background-color: rgba(15, 15, 15, 0.6);
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