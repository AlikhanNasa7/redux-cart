import classes from './CartItem.module.css';
import { cartActions } from '../../store/store';
import { useDispatch } from 'react-redux';
const CartItem = (props) => {
  const { title, quantity, total, price,id } = props.item;

  const dispatch = useDispatch()

  const handleAdd = ()=>{
    console.log(props.item)
    dispatch(cartActions.addItem(props.item))
  }

  const handleRemove = ()=>{
    dispatch(cartActions.removeItem(id))
  }

  return (
    <li className={classes.item} key={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemove}>-</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
