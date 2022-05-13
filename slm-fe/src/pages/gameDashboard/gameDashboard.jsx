import Page from '../../components/page/page';
import LeagueTable from '../../components/leagueTable';
import getNextGame from '../../components/nextGame/getNextGame';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const GameDashboard = ({
  user,
  game,
  history,
  simulateGames,
}) => {
  const navigate = (path) => {
    history.push(path);
  };
  
  const playGames = async () => {
    await simulateGames(game);
    
    return navigate(PAGES.PLAY_GAME.path);
  }

  return (
    <Page>
      <h1>Dashboard</h1>
      <h2>{user.username}, use the navigation buttons to select your next action</h2>
      <div id="nav-bar" className={styles.dashboard}>
        <button id="transfers-button" type="submit" onClick={e => navigate(PAGES.TRANSFERS.path)} data-testid="transfers-button" className={styles.button}>Transfers</button>
        <button id="pick-team-button" type="submit" onClick={e => navigate(PAGES.PICK_TEAM.path)} data-testid="pick-team-button" className={styles.button}>Pick Team</button>
        <button id="play-game-button" type="submit" onClick={e => playGames()} data-testid="play-game-button" className={styles.button}>Play Game</button>
      </div>
      {getNextGame(game)}
      <LeagueTable history={history} />
    </Page>
  );
};

export default GameDashboard;
