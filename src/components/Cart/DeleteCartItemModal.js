import React, { Fragment, useContext } from 'react';
import styles from './DeleteCartItemModal.module.css';
// HELPERS
import useFindItemInCart from '../../helpers/findItemIndex';
// CONTEXT
import {
  CartContext,
  CartDispatchContext,
} from '../../context/CartContext';
// ACTIONS
import {
  UPDATE_CART_ITEM,
  UPDATE_TOTAL_QTY_AND_PRICE,
} from '../../reducers/cartReducer';

function DeleteCartItemModal({ item, setShowDeleteModal }) {
  const cartContext = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  const { name, id } = item;
  const itemIndex = useFindItemInCart(id);

  const handleDeleteOption = (e) => {
    const deleteOption = e.target.dataset.deleteOption;

    if (deleteOption === 'no') {
      setShowDeleteModal(false);
      return;
    }

    if (deleteOption === 'yes') {
      const newCart = cartContext.items.filter(
        (item, i) => i !== itemIndex
      );

      dispatch({
        type: UPDATE_CART_ITEM,
        payload: newCart,
      });

      dispatch({
        type: UPDATE_TOTAL_QTY_AND_PRICE,
      });

      setShowDeleteModal(false);
    }
  };

  return (
    <Fragment>
      <div className={styles['delete-item-modal']}>
        <div className={styles['delete-item-msg']}>
          Do you want to delete {name}?
        </div>
        <div
          onClick={handleDeleteOption}
          className={styles['delete-item-btns']}
        >
          <button data-delete-option="yes">Yes</button>
          <button data-delete-option="no">No</button>
        </div>
      </div>
    </Fragment>
  );
}

export default DeleteCartItemModal;
