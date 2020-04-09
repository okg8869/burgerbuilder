import React from 'react';

//Components
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

// remember video 123 (enabling modules and editing webpack.config 
// to turn on styling and whatnot)


function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
