import React, { useRef, useContext, useEffect } from 'react';
import styles from './MealItemForm.module.css';
// COMPONENTS
import Input from '../UI/Input';
// HELPERS
import useFindItemInCart from '../../helpers/findItemIndex';
// CONTEXT
import {
  CartContext,
  CartDispatchContext,
} from '../../context/CartContext';
// ACTIONS
import {
  ADD_CART_ITEM,
  UPDATE_CART_ITEM,
  UPDATE_TOTAL_QTY_AND_PRICE,
} from '../../reducers/cartReducer';

function MealItemForm({ meal }) {
  const { description, id, name, price } = meal;
  const itemIndex = useFindItemInCart(id);

  const quantityInputRef = useRef(null);
  const cartContext = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  // Update form input value when item qty is changed in the cart modal
  useEffect(() => {
    // Last cart item deleted
    if (cartContext.items.length === 0)
      quantityInputRef.current.value = '';

    // Cart item qty is edited
    if (cartContext.items.length > 0 && cartContext.showCart) {
      // An item is deleted (other items remain)
      if (itemIndex === -1) {
        quantityInputRef.current.value = '';
      }
      // An item qty is changed
      if (itemIndex !== -1) {
        cartContext.items.forEach((item, i) => {
          if (i === itemIndex)
            quantityInputRef.current.value = item.quantity;
        });
      }
    }
  });

  const createItem = (quantity) => {
    return {
      id,
      name,
      description,
      price,
      quantity,
      subtotal: price * quantity,
    };
  };

  const createNewCart = (quantity) => {
    return cartContext.items.map((item, i) => {
      if (i === itemIndex) {
        item = {
          ...item,
          quantity: quantity,
          subtotal: item.price * quantity,
        };
      }
      return item;
    });
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    const quantity = +quantityInputRef.current.value;
    const itemToAdd = createItem(quantity);

    // ADD NEW ITEM TO CART
    if (quantity > 0 && itemIndex === -1) {
      dispatch({
        type: ADD_CART_ITEM,
        payload: itemToAdd,
      });
    }

    // UPDATE ITEM IN CART
    if (quantity > 0 && itemIndex > -1) {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: createNewCart(quantity),
      });
    }

    // IF QTY SET TO ZERO
    if (quantity === 0 && itemIndex > -1) {
      const filteredCart = cartContext.items.filter(
        (item, i) => i !== itemIndex
      );
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: filteredCart,
      });
    }

    dispatch({ type: UPDATE_TOTAL_QTY_AND_PRICE });
  };

  return (
    <form className={styles['meal-form']} onSubmit={handleAddMeal}>
      <div>
        <Input
          label="meal-quantity"
          type="number"
          min="0"
          max="5"
          ref={quantityInputRef}
        >
          Qty
        </Input>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default MealItemForm;
