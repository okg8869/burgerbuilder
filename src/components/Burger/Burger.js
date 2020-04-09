import React from 'react';

// Components
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

// CSS
import classes from './Burger.module.css'



const burger = (props) => {

// Transform object of key/value pairs from state into array of strings
// and use reduce to get the value of each element in the ingredient state
  let ingredientsMap = Object.keys(props.ingredients).map(ingKey => {
    return [...Array(props.ingredients[ingKey])].map((_, index) => {
      return <BurgerIngredient key={ingKey + index} type={ingKey} />
    });
  }).reduce((prev, cur) => {
    return prev.concat(cur)
  }, []);

  if (ingredientsMap.length === 0) {
    ingredientsMap = <p>Please start adding ingredients!</p>
  }

  console.log(ingredientsMap)
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
        {ingredientsMap}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;