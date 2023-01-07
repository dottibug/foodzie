import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function useFindItemInCart(id) {
  const cartContext = useContext(CartContext);

  return cartContext.items.findIndex(
    (cartItem) => cartItem.id === id
  );
}

export default useFindItemInCart;
