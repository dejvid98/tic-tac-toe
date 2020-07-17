// Libraries imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Relative imports
import LandingPage from './components/LandingPage/LandingPage';
import BoardsPage from './components/BoardsPage/BoardsPage';

function App() {
  return (
    <Switch>
      <Route exact={true} path="/" component={LandingPage} />
      <Route exact={true} path="/boards" component={BoardsPage} />
    </Switch>
  );
}

export default App;
