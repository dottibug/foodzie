import React, {
  Fragment,
  useContext,
  useState,
  useMemo,
} from 'react';
import styles from './Cart.module.css';
// COMPONENTS
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import CartItem from './CartItem';
// REACT-ICONS
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
// HELPERS
import { formatPrice } from '../../helpers/currency';
// CONTEXT
import {
  CartContext,
  CartDispatchContext,
} from '../../context/CartContext';
// ACTIONS
import {
  SHOW_CART,
  CLEAR_CART,
  UPDATE_TOTAL_QTY_AND_PRICE,
} from '../../reducers/cartReducer';

function Cart() {
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const cartContext = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  const iconMemo = useMemo(() => {
    return { size: '2rem' };
  }, []);

  const handleCloseCart = () => {
    dispatch({
      type: SHOW_CART,
    });
  };

  const handleCloseOrderSuccess = () => {
    setShowOrderSuccess(false);
    dispatch({
      type: SHOW_CART,
    });
  };

  const handleOrderClick = () => {
    dispatch({ type: CLEAR_CART });
    dispatch({ type: UPDATE_TOTAL_QTY_AND_PRICE });
    setShowOrderSuccess(true);
  };

  const renderCloseCartButton = (
    <div className={styles['close-cart']} onClick={handleCloseCart}>
      <IconContext.Provider value={iconMemo}>
        <IoClose />
      </IconContext.Provider>
    </div>
  );

  const renderCloseOrderSuccessButton = (
    <div
      className={styles['close-cart']}
      onClick={handleCloseOrderSuccess}
    >
      <IconContext.Provider value={iconMemo}>
        <IoClose />
      </IconContext.Provider>
    </div>
  );

  const renderCartItems = () => {
    if (cartContext.items.length === 0 && !showOrderSuccess) {
      return (
        <div className={styles['cart-msg']}>
          Add some delicious food to your cart!
        </div>
      );
    }
    return cartContext.items.map((item) => (
      <CartItem key={item.id} item={item} />
    ));
  };

  const renderTotal = () => {
    if (cartContext.items.length === 0) return;
    return (
      <div className={styles['total']}>
        <h2>Total</h2>
        <h2>{formatPrice(cartContext.totalPrice)}</h2>
      </div>
    );
  };

  const renderCartActions = () => {
    if (cartContext.items.length === 0) return;
    return (
      <div className={styles['cart-actions']}>
        <button onClick={handleCloseCart}>Close</button>
        <button onClick={handleOrderClick}>Order</button>
      </div>
    );
  };

  const renderOrderSuccess = (
    <Fragment>
      <Modal>
        <Card className={styles['cart']}>
          {renderCloseOrderSuccessButton}
          <div className={styles['cart-msg']}>
            <p className={styles['cart-msg-yum']}>Yum!</p>
            <p>Your order is on the way.</p>
          </div>
        </Card>
      </Modal>
    </Fragment>
  );

  const renderCart = (
    <Fragment>
      <Modal>
        <Card className={styles['cart']}>
          {renderCloseCartButton}
          <ul className={styles['cart-items']}>
            {renderCartItems()}
          </ul>
          {renderTotal()}
          {renderCartActions()}
        </Card>
      </Modal>
    </Fragment>
  );

  return (
    <Fragment>
      {(cartContext.showCart &&
        showOrderSuccess &&
        renderOrderSuccess) ||
        (cartContext.showCart && renderCart)}
    </Fragment>
  );
}

export default Cart;
