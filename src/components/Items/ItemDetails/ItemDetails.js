import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './ItemDetails.module.css';
import ItemForm from './ItemForm';
const ItemDetails = (props) => { 
    const cartCtx =  useContext(CartContext);
    const price = `$${props.price?.toFixed(2)}`;
    
    const onAddToCartHandler = quantity => { 
        cartCtx.addItem({
            id: props.id,
            title: props.title,
            description: props.description,
            quantity: quantity,
            price: props.price
        });
    };
    return (<li className={classes.item}>
        <div>
            <h3>{props.title}</h3>
            <div><h3 className={classes.description}>{props.description}</h3></div>
            <div><h3 className={classes.price}>{price}</h3></div>
        </div>
        <div>
            <ItemForm onAddToCart={onAddToCartHandler} />
        </div>
    </li>);
};
export default ItemDetails;