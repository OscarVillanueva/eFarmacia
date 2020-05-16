import ShoppingListState from '../context/ShoppingListState';
import FirebaseContext from '../firebase/context';
import useAuth from '../hooks/useAuth';

const Init = ({ Component, pageProps }) => {

    const currentUser = useAuth()

    return ( 
        <ShoppingListState>
            <FirebaseContext.Provider
                value = {{
                    currentUser
                }}
            >
                <Component { ...pageProps } />
            </FirebaseContext.Provider>
        </ShoppingListState>
    );
}
 
export default Init;