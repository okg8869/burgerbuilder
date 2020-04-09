import React, { Component } from 'react';

// Components
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

// CSS
import classes from './Burger.module.css'

// class Burger extends Component {
//   render() {
//     return 
//   }
// }

const burger = (props) => {
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      <BurgerIngredient type="salad"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="meat"/>
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;