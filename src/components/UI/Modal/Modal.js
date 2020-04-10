import React from 'react';

// Components
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../Backdrop/Backdrop'

// CSS
import classes from './Modal.module.css'

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div 
        className={classes.Modal} 
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
  </Aux>
);


export default modal;