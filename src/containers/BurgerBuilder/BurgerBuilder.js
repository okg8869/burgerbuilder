import React, { Component } from "react";

// Components
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: .25,
  cheese: .8,
  meat: 2.39,
  bacon: 1.55
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const currentCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentCount;

    const priceAddtion = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const realPrice = oldPrice + priceAddtion;
    this.setState({totalPrice: realPrice, ingredients: updatedIngredients});
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
        return;
      }
    const currentCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentCount;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const realPrice = oldPrice - priceSubtraction;
    this.setState({totalPrice: realPrice, ingredients: updatedIngredients});
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Auxillary>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxillary>
    )
  }
}



export default BurgerBuilder;