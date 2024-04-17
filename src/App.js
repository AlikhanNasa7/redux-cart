import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { sendCartData,fetchCartData } from './store/store';

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state=>state.ui.cartIsVisible)
  const cart = useSelector(state=>state.cart)

  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(()=>{
    if (isInitial){
      isInitial = false
      return
    }
    dispatch(sendCartData(cart))
  },[cart,dispatch])

  return (
    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;
