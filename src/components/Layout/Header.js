import React, { Fragment } from 'react';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import food from '../../Images/food.jpg';

function Header() {
  return (
    <Fragment>
      <header className={styles['header']}>
        <h1>Foodzie</h1>
        <HeaderCartButton>Cart</HeaderCartButton>
      </header>
      <div className={styles['main-image']}>
        <img src={food} alt="Various foods" />
      </div>
    </Fragment>
  );
}

export default Header;
