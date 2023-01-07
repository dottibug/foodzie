import React, { Fragment } from 'react';

// COMPONENTS
import Header from './components/Layout/Header';
import Summary from './components/Layout/Summary';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

// CONTEXTS
import { CartContextProvider } from './context/CartContext';
import { MealsContextProvider } from './context/MealsContext';

function App() {
  return (
    <Fragment>
      <CartContextProvider>
        <Header />
        <Cart />
        <Summary />
        <MealsContextProvider>
          <Meals />
        </MealsContextProvider>
      </CartContextProvider>
    </Fragment>
  );
}

export default App;
