import classes from './CartButton.module.css';
import { useSelector } from 'react-redux';
const CartButton = (props) => {
  const cartItems = useSelector(state=>state.cart.items)
  const totalItems = cartItems.reduce((acc,cur)=>acc+cur.quantity,0)
  return (
    <button className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
