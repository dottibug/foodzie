// ACTIONS
export const ADD_CART_ITEM = 'addCartItem';
export const UPDATE_CART_ITEM = 'updateCartItems';
export const UPDATE_TOTAL_QTY_AND_PRICE = 'updateTotalQtyAndPrice';
export const CLEAR_CART = 'clearCart';
export const SHOW_CART = 'showCart';

// INITIAL CART STATE
export const initialCart = {
  items: [],
  totalItemQty: 0,
  totalPrice: 0,
  showCart: false,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_CART_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case UPDATE_CART_ITEM: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case UPDATE_TOTAL_QTY_AND_PRICE: {
      return {
        ...state,
        totalItemQty: state.items
          .map((item) => item.quantity)
          .reduce((prev, cur) => prev + cur, 0),
        totalPrice: state.items
          .map((item) => item.subtotal)
          .reduce((prev, cur) => prev + cur, 0),
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    case SHOW_CART: {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }
    default: {
      throw new Error('No matching action type in cart reducer.');
    }
  }
}
