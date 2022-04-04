import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import SelectGames from './pages/selectGames';
import GameDashboard from './pages/gameDashboard';
import Transfers from './pages/transfers';
import PickTeam from './pages/pickTeam';
import PlayGame from './pages/playGame';
import ViewPlayer from './pages/viewPlayer';
import ViewTeam from './pages/viewTeam';
import { PAGES } from './constants';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PAGES.LOGIN_PAGE.path} exact component={Login} />
        <Route path={PAGES.SELECT_GAMES_PAGE.path} exact component={SelectGames} />
        <Route path={PAGES.GAME_DASHBOARD.path} exact component={GameDashboard} />
        <Route path={PAGES.TRANSFERS.path} exact component={Transfers} />
        <Route path={PAGES.PICK_TEAM.path} exact component={PickTeam} />
        <Route path={PAGES.PLAY_GAME.path} exact component={PlayGame} />
        <Route path={PAGES.VIEW_PLAYER.path} exact component={ViewPlayer} />
        <Route path={PAGES.VIEW_TEAM.path} exact component={ViewTeam} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
