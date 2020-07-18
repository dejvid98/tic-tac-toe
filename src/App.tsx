// Libraries imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Relative imports
import LandingPage from './components/LandingPage/LandingPage';
import BoardsPage from './components/BoardsPage/BoardsList';
import Game from './components/BoardsPage/Game';

function App() {
  return (
    <Switch>
      <Route exact={true} path="/" component={LandingPage} />
      <Route exact={true} path="/boards" component={BoardsPage} />
      <Route exact={true} path="/game/:id/:roomId" component={Game} />
    </Switch>
  );
}

export default App;
