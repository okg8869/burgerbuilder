import React, { Component } from "react";

// Components
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// AXIOS
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: .25,
  cheese: .8,
  meat: 2.39,
  bacon: 1.55
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://burgerbuilder-9097f.firebaseio.com/Ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data})
      } )
      .catch(error => {
        this.setState({error: true})
      } );
  }

  updatePurchaseState = (ingredients) => {
     // Create an array of string entries from state as ingredients are added
     // and summing how many we have
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    
    this.setState({purchasable: sum > 0});
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
    this.updatePurchaseState(updatedIngredients);
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
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
// Submitting to the orders tag in firebase (BaseURL already programmed in in the axios-orders.js instance file)
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Oliver G',
        address: {
          street: 'Bland St',
          zipCode: '28203',
          Country: "USA"
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(  response => {
        this.setState({ loading: false, purchasing: false });
      } )
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      } )
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burger = ( 
        <Auxillary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}/>
        </Auxillary>
      );
      orderSummary = (
        <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
        )
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Auxillary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxillary>
    )
  }
}



export default withErrorHandler(BurgerBuilder, axios);