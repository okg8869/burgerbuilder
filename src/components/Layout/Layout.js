import React from 'react';

//Components
import Aux from '../../hoc/Auxillary';

// CSS
import classes from './Layout.module.css';

const Layout = (props) => (
  <Aux>
    <div> Toolbar, SideDrawer, Backdrop </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;