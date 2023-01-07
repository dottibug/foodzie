import React from 'react';
import styles from './Summary.module.css';

function Summary() {
  return (
    <section className={styles.summary}>
      <h2>Delicious Foods, Delivered To You</h2>
      <p>
        Choose a meal from our curated selection of artisan foods
        cooked with the highest quality ingredients. Made fresh to
        order and delivered fast!
      </p>
    </section>
  );
}

export default Summary;
