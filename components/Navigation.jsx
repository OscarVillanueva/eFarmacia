import React, { useContext } from 'react';
import Link from 'next/link';
import Search from './Search';
import ShoppingList from './ShoppingList';
import FirebaseContext from '../firebase/context';
import firebase from '../firebase/firebase';

const Nav = ({ full, top }) => {

    // Sacamos el usuario logeado
    const firebaseContext = useContext( FirebaseContext )
    const { currentUser } = firebaseContext

    const handleClick = () => {
        firebase.signout()
    }

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

                { currentUser 
                    ? (
                        <>
                            <p 
                                className = {`mr-2 lg:mb-0 ${full ? 'text-gray-800' : 'text-gray-200'}`}
                            >
                                    Hola: { currentUser.displayName }
                            </p>
                            <button
                               className = { `py-2 px-4 text-center mr-2 
                               ${ full ? 'bg-gray-200  text-gray-800 rounded' : 'text-gray-200'}` }
                                type = "button"
                                onClick = { handleClick }
                            >
                                Salir
                            </button>
                        </>
                    ) 
                    : (
                        <>
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
                        </>
                    )
                }


                { top && (
                    <ShoppingList full = { full } />
                )}

                
            </div>

        </div>

    );
}
 
export default Nav;