import React, { Component } from "react";

// Components
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
  render() {
    return (
      <Auxillary>
        <Burger/>
        <dib>Build Controls</dib>
      </Auxillary>
    )
  }
}



export default BurgerBuilder;