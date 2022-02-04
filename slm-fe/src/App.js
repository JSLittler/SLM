import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import SavedGames from './pages/savedGames';
import gameDashboard from './pages/gameDashboard/gameDashboard';
import { PAGES } from './constants';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PAGES.LOGIN_PAGE.path} exact component={Login} />
        <Route path={PAGES.SAVED_GAMES_PAGE.path} exact component={SavedGames} />
        <Route path={PAGES.GAME_DASHBOARD.path} exact component={gameDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
