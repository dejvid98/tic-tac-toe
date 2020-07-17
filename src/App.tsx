// Libraries imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Relative imports
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <Switch>
      <Route exact={true} path="/" component={LandingPage} />
    </Switch>
  );
}

export default App;
