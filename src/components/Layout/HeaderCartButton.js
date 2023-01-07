import React, { useContext, useMemo } from 'react';
import styles from './HeaderCartButton.module.css';
// REACT-ICONS
import { IconContext } from 'react-icons';
import { BiCart } from 'react-icons/bi';
// CONTEXT
import {
  CartContext,
  CartDispatchContext,
} from '../../context/CartContext';
// ACTIONS
import { SHOW_CART } from '../../reducers/cartReducer';

function HeaderCartButton({ children }) {
  const cartContext = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  const iconMemo = useMemo(() => {
    return { className: `${styles['icon-test']}`, size: '1.5rem' };
  }, []);

  function handleShowCart() {
    dispatch({ type: SHOW_CART });
  }

  return (
    <button className={styles.button} onClick={handleShowCart}>
      <div className={styles.icon}>
        <IconContext.Provider value={iconMemo}>
          <BiCart />
        </IconContext.Provider>
      </div>
      <div>{children}</div>
      <div className={`${styles['badge']} ${styles['bump']}`}>
        <span className={styles['badge-span']}>
          {cartContext.totalItemQty}
        </span>
      </div>
    </button>
  );
}

export default HeaderCartButton;
