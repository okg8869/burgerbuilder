import React, { Component } from 'react';

// Components
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

// CSS
import classes from './Modal.module.css';

// Converted to class from functional to control when DOM is updated
// shouldComponentUpdate being checked below
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children; // checking the children components (OrderSummary)
  }

  componentDidUpdate() {
    console.log('[Modal] Will Update')
  }
  
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
          <div 
            className={classes.Modal} 
            style={{
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
          </div>
      </Aux>
    );
  }
}

export default Modal;