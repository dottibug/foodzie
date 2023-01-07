import React, { createContext, useReducer } from 'react';
import { initialCart, cartReducer } from '../reducers/cartReducer';

export const CartContext = createContext([]);
export const CartDispatchContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    // allows access to cart state
    <CartContext.Provider value={cart}>
      {/* allows access to dispatch actions */}
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
