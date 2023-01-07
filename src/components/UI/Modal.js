import React, { Fragment, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
// CONTEXTS
import { CartDispatchContext } from '../../context/CartContext';
// REDUCER ACTIONS
import { SHOW_CART } from '../../reducers/cartReducer';

function Modal({ children }) {
  const bodyElement = document.querySelector('body');
  const modalDiv = document.getElementById('modal');
  const dispatch = useContext(CartDispatchContext);

  const toggleModalOnEscape = (e) => {
    if (e.key === 'Escape') {
      dispatch({
        type: SHOW_CART,
      });
    }
  };

  //   LOCK SCROLLING & LISTEN FOR ESC KEY
  useEffect(() => {
    bodyElement.style.overflow = 'hidden';
    window.addEventListener('keydown', toggleModalOnEscape);

    // Effect cleanup
    return () => {
      bodyElement.style.overflow = 'unset';
      window.removeEventListener('keydown', toggleModalOnEscape);
    };
  });

  return (
    <Fragment>
      {createPortal(
        <Fragment>
          <div
            className={styles['modal-background']}
            onClick={() => dispatch({ type: SHOW_CART })}
          ></div>
          {children}
        </Fragment>,
        modalDiv
      )}
    </Fragment>
  );
}

export default Modal;
