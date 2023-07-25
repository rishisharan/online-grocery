import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedItems;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        if (existingCartItem) {
            const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity +  action.item.quantity };
            updatedItems = [...state.items]; 
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {      
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalQuantity = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
            
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalQuantity
        }
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => { 

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => { 
        dispatchCartAction({ type: 'ADD', item });
    };
    const removeItemToCartHandler = (id) => { 
        dispatchCartAction({ type: 'REMOVE', id });
    };
    
    const clearItemToCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
     };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearItemToCartHandler
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
;};
export default CartProvider;