import Page from '../../components/page/page';
import SavedGame from '../../components/savedGame/savedGame';
import { PAGES } from '../../constants';
import ApiClient from '../../utils/apiClient';
import { URLS } from '../../constants';

import styles from './styles.scss';

const SelectGames = ({
  user,
  savedGame,
  history,
  startNewGame,
}) => {
  const newGame = async path => {
    const loadedGame = await ApiClient(URLS.NEW_GAME_URL, user.username, user.id);

    startNewGame(loadedGame);
    history.push(path)
  };

  const loadGame = async path => {
    startNewGame(savedGame);
    history.push(path)
  };

  return (
    <Page>
      <h1>Select Game</h1>
      <div id="select-game" data-testid="select-game" className={styles.selectGame}>
        <SavedGame game={savedGame} username={user.username} loadGame={loadGame}/>
        <button id="new-game-button" type="submit" onClick={e => newGame(PAGES.GAME_DASHBOARD.path)} data-testid="new-game-button" className={styles.button}>Start a new game</button>
      </div>
    </Page>
  );
};

export default SelectGames;
