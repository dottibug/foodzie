import React, {
  Fragment,
  useContext,
  useState,
  useMemo,
} from 'react';
import styles from './CartItem.module.css';
// COMPONENTS
import DeleteCartItemModal from './DeleteCartItemModal';
// REACT-ICONS
import { IconContext } from 'react-icons';
import { BiMinus, BiPlus } from 'react-icons/bi';
// HELPERS
import useFindItemInCart from '../../helpers/findItemIndex';
import { formatPrice } from '../../helpers/currency';
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

function CartItem({ item }) {
  const cartContext = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const [cartMsg, setCartMsg] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id } = item;
  const itemIndex = useFindItemInCart(id);

  const iconMemo = useMemo(() => {
    return { size: '1.4rem' };
  }, []);

  const editQtyButtons = () => {
    const editOptions = ['minus', 'plus'];

    const qtyButtons = editOptions.map((option) => {
      return (
        <button
          className={styles['button-edit-qty']}
          key={option}
          data-edit-qty={option}
          onClick={handleEditQty}
        >
          <IconContext.Provider value={iconMemo}>
            {option === 'minus' ? <BiMinus /> : <BiPlus />}
          </IconContext.Provider>
        </button>
      );
    });
    return qtyButtons;
  };

  const createNewCart = (editType) => {
    return cartContext.items.map((cartItem, i) => {
      const newQty =
        editType === 'plus'
          ? cartItem.quantity + 1
          : cartItem.quantity - 1;

      if (i === itemIndex) {
        cartItem = {
          ...cartItem,
          quantity: newQty,
          subtotal: cartItem.price * newQty,
        };
      }
      return cartItem;
    });
  };

  const updateCart = (editType) => {
    const qtyInCart = cartContext.items[itemIndex].quantity;

    // Cart Message (if qty error)
    if (editType === 'plus' && qtyInCart === 5) {
      setCartMsg('Max quantity of an item is 5.');
    }

    // Confirm Deletion (if qty reduced to 0)
    if (editType === 'minus' && qtyInCart === 1) {
      setShowDeleteModal(true);
      // return to prevent carrying out update of cart below
      return;
    }

    // Update Cart Items (if NO qty error)
    if (
      (qtyInCart > 0 && qtyInCart < 5 && editType === 'plus') ||
      (qtyInCart > 0 && qtyInCart <= 5 && editType === 'minus')
    ) {
      const newCart = createNewCart(editType);

      setCartMsg('');

      dispatch({
        type: UPDATE_CART_ITEM,
        payload: newCart,
      });

      dispatch({
        type: UPDATE_TOTAL_QTY_AND_PRICE,
      });
    }
  };

  const handleEditQty = (e) => {
    const editType = e.currentTarget.dataset.editQty;
    updateCart(editType);
  };

  return (
    <Fragment>
      {showDeleteModal && (
        <DeleteCartItemModal
          item={item}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <div className={styles['cart-item']}>
        <div className={styles['item-summary']}>
          <div className={styles['item-qty-name']}>
            <div className={styles['item-quantity']}>
              x {item.quantity}
            </div>
            <h2 className={styles['item-name']}>{item.name}</h2>
          </div>
          <p className={styles['cart-message']}>{cartMsg}</p>
        </div>
        <div className={styles['item-edit-subtotal']}>
          <div className={styles['buttons-edit-qty']}>
            {editQtyButtons()}
          </div>
          <div
            className={styles['item-subtotal']}
          >{`Subtotal:  ${formatPrice(item.subtotal)}`}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default CartItem;
