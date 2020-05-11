import React from 'react';
import Head from 'next/head';
import FullHeader from './FullHeader';

const Layout = ({ children }) => {
    return ( 
        <>
            <Head>
                <title>eFarmacia</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>

            <FullHeader />

            <div className="bg-gray-200h.screen">
                <main className="w-4/5 mx-auto">
                    { children }
                </main>
            </div>

        </>
    );
}
 
export default Layout;