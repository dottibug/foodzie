import React from 'react';
import styles from './MealItem.module.css';
// COMPONENTS
import MealItemForm from './MealItemForm';
// HELPERS
import { formatPrice } from '../../helpers/currency';

function MealItem({ meal }) {
  const { description, name, price } = meal;

  return (
    <li className={styles['meal']}>
      <div className={styles['meal-info']}>
        <h3>{name}</h3>
        <div className={styles['description']}>{description}</div>
        <div className={styles['price']}>{formatPrice(price)}</div>
      </div>
      <div className={styles['meal-form']}>
        <MealItemForm meal={meal} />
      </div>
    </li>
  );
}

export default MealItem;
