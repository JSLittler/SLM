import Page from '../../components/page/page';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const GameDashboard = ({
  user,
  game,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  const getNextGame = () => {
    const gameWeekGames = game.fixtures.filter(f => f.gameWeek === game.gameWeek);
    const nextGame = gameWeekGames[0].fixtures.filter(g => g.home === game.playersTeam.name || g.away === game.playersTeam.name);

    return (
      <p>home: {nextGame[0].home} vs away: {nextGame[0].away}</p>
    );
  }

  return (
    <Page>
      <h1>Dashboard</h1>
      <h2>{user.username}, use the navigation buttons to select your next action</h2>
      <div id="nav-bar" className={styles.dashboard}>
        <button id="transfers-button" type="submit" onClick={e => navigate(PAGES.TRANSFERS.path)} data-testid="transfers-button" className={styles.button}>Transfers</button>
        <button id="pick-team-button" type="submit" onClick={e => navigate(PAGES.PICK_TEAM.path)} data-testid="pick-team-button" className={styles.button}>Pick Team</button>
        <button id="play-game-button" type="submit" onClick={e => navigate(PAGES.PLAY_GAME.path)} data-testid="play-game-button" className={styles.button}>Play Game</button>
      </div>
      <div>
        <h2>Next game</h2>
        <p>{getNextGame()}</p>
      </div>
      <div>
        <h2>League Table</h2>
        <p>put league table here when component is made</p>
      </div>
      <div>
        <h2>Squad</h2>
        <p>Put squad here when you have the component ready</p>
      </div>
    </Page>
  );
};

export default GameDashboard;
