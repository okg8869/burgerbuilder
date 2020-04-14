import React from 'react';

// Logo Image
import burgerLogo from '../../assets/images/burgerLogo.png'

// CSS
import classes from './Logo.module.css'

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt='BurgerBuilder'/>
  </div>
);

export default logo;