import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const quantity = +props.quantity;
  const totalByQuantity = `$${(Number(props.price) *  quantity).toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.quantity}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes.price}>{totalByQuantity}</div>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
