import React, { useContext } from 'react';
import styles from './Meals.module.css';

// COMPONENTS
import Card from '../UI/Card';
import MealItem from './MealItem';

// CONTEXT
import { MealsContext } from '../../context/MealsContext';

function Meals() {
  const mealsContext = useContext(MealsContext);

  const renderedMeals = mealsContext.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });

  return (
    <div className={styles.meals}>
      <Card>
        <ul>{renderedMeals}</ul>
      </Card>
    </div>
  );
}

export default Meals;
