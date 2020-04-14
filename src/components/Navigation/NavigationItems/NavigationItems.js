import React from 'react';

// CSS
import classes from './NavigationItems.module.css';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={"/"} active> Burger Builder </NavigationItem>
    <NavigationItem link={"/"}> Checkout </NavigationItem>
  </ul>
);

export default navigationItems;