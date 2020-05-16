import { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const useAuth = () => {

    // State del hook para almacenar el currentUser 
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        
        const unsuscribe = firebase.auth.onAuthStateChanged( user => {

            if ( user ) setCurrentUser( user )
            else setCurrentUser( null )

        })

        return () =>  unsuscribe()

    }, [])

    return currentUser
    
}
 
export default useAuth;