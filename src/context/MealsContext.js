import React, { createContext, useMemo } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Wild-caught fish and the best miso soup.',
    price: 18.0,
  },
  {
    id: 'm2',
    name: 'Street Tacos',
    description: 'Corn tortillas and plenty of vegan options.',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Farm-to-Table Burgers',
    description: 'Locally sourced ingredients and housemade sauces.',
    price: 21.0,
  },
  {
    id: 'm4',
    name: 'Green Bowls',
    description: 'Fresh crisp veg and dressings made in house.',
    price: 17.5,
  },
];

export const MealsContext = createContext(DUMMY_MEALS);

export function MealsContextProvider({ children }) {
  const meals = useMemo(() => DUMMY_MEALS, []);

  return (
    <MealsContext.Provider value={meals}>
      {children}
    </MealsContext.Provider>
  );
}
