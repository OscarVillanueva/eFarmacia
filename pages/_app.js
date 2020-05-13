import WhishListState from '../context/ShoppingListState';

const Init = ({ Component, pageProps }) => {
    return ( 
        <WhishListState>
            <Component { ...pageProps } />
        </WhishListState>
    );
}
 
export default Init;