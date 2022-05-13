import Page from '../../components/page/page';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const PlayGame = ({
  game,
  history,
  saveGame,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  const returnToDashboard = path => {
    saveGame(game);

    return navigate(path);
  };

  return (
    <Page>
      <h1>Play Game</h1>
      <div id="play-game" data-test="pick-team" className={styles.playGame}>
        <button id="dashboard-button" type="submit" onClick={() => returnToDashboard(PAGES.GAME_DASHBOARD.path)} data-testid="transfers-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default PlayGame;
