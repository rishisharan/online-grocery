import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "http://localhost:8080/api/v1/orders",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          customer: userData,
          items: cartCtx.items,
          total: cartCtx.totalAmount,
          orderStatus: 'PENDING',
        }),
      }
    ).catch((error) => {
      setIsError(true);
    });
    cartCtx.clearCart();
    setIsSubmitSuccess(true);
    setIsSubmitting(false);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={item.id}
          title={item.title}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const errorPlacingOrder = (<Fragment><p>We're sorry, but there was a problem with your order submission.</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>    
    </div>
  </Fragment >);

 const isSubmittingModalContent = <p>Sending order data..</p>;

  const submitSuccesful = (<Fragment><p>Order Successfully Submitted!</p>   
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>    
    </div>
  </Fragment>);

  return <Modal onClose={props.onClose}>
    {!isSubmitting && !isSubmitSuccess && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && isSubmitSuccess && !isError && submitSuccesful}
    {isError && errorPlacingOrder}
  </Modal>;
};
export default Cart;
