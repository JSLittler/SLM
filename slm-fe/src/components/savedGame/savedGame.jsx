import { PAGES } from '../../constants';

import styles from './styles.scss';

const SavedGame = ({
  username,
  game,
  loadGame
}) => {
  const noSavedGameElement = (
    <div>
      <p>You do not currently have any saved games</p>
    </div>
  );

  const savedGameElement =  (
    <div id="saved-game" data-testid="saved-game" className={styles.savedGame}>
      <h2>you have a game saved</h2>
      <div>
        <p>Your Team: {game?.playersTeam?.name}</p>
        <p>Game Week: {game?.gameWeek}</p>
      </div>
      <button id="load-game-button" type="submit" onClick={e => loadGame(PAGES.GAME_DASHBOARD.path)} data-testid="load-game-button" className={styles.button}>Continue this game</button>
      <p>Starting a new game will overwrite your saved game</p>
    </div>
  );

  const jsx = game?.playersTeam ? savedGameElement : noSavedGameElement;

  return (
    <div>
      <h2>Hi {username},</h2>
      {jsx}
    </div>
  );
};

export default SavedGame;