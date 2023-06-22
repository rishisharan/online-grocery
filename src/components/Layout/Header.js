import image from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { Fragment, useState } from 'react';
import HeaderCartButton from './HeaderCartButton';
import Items from '../Items/Items';
import Cart from '../Cart/Cart';
import CartProvider from '../store/cart-provider';
const Header = props => {
    
    const [cartVisible, setCartVisible] = useState(false);
    
    const showCartHandler = () => {
        setCartVisible(true);
    };
    
    const hideCartHandler = () => { 
        setCartVisible(false);
    };
    
    return <CartProvider>
        {cartVisible && <Cart onClose={hideCartHandler}></Cart>}
        <header className={classes.header}>
            <h1>Online Grocery</h1>
            <HeaderCartButton onClick={showCartHandler}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={image} alt="A one stop store for all indian gorcery" />
        </div>
        
        <main>
          <Items></Items> 
        </main>
    </CartProvider>;
 };
export default Header;