import ShoppingListState from '../context/ShoppingListState';
import FirebaseContext from '../firebase/context';
import useAuth from '../hooks/useAuth';

const Init = ({ Component, pageProps }) => {

    const currentUser = useAuth()

    return ( 
        <FirebaseContext.Provider
            value = {{
                currentUser
            }}
        >
            <ShoppingListState>
                <Component { ...pageProps } />
            </ShoppingListState>
        </FirebaseContext.Provider>
    );
}
 
export default Init;