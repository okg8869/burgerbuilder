import React from 'react';

//Components
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>w
    </div>
  );
}

export default App;