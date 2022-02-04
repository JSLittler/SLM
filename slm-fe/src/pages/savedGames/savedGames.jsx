import Page from '../../components/page/page';
import { PAGES } from '../../constants';
import ApiClient from '../../utils/apiClient';
import { URLS } from '../../constants';

import styles from './styles.scss';

const SavedGames = ({
  user,
  history,
  startNewGame,
}) => {
  const newGame = async path => {
    const loadedGame = await ApiClient(URLS.NEW_GAME_URL, user.username, user.id);

    startNewGame(loadedGame);
    history.push(path)
  };

  const getSavedGames = () => {
    return (
      <div>Saved game</div>
    ); // replace with call to api
  };

  return (
    <Page>
      <h2>Select Game</h2>
      <div id="select-game" data-testid="select-game" className={styles.selectGame}>
        <button id="new-game-button" type="submit" onClick={e => newGame(PAGES.GAME_DASHBOARD.path)} data-testid="new-game-button" className={styles.button}>Start a new game</button>
        <button id="saved-games-button" type="submit" onClick={e => getSavedGames()} data-testid="saved-games-button" className={styles.button}>Find previous games</button>
      </div>
    </Page>
  );
};

export default SavedGames;
