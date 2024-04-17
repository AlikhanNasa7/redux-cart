import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import store from '../../store/store';
import { useSelector } from 'react-redux';
const Cart = (props) => {
  const storeItems = useSelector(state=>state.cart.items)
  console.log(storeItems)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {storeItems.map(item=> <CartItem
            item={{ title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price,id:item.itemId }}
          />)}
      </ul>
    </Card>
  );
};

export default Cart;
