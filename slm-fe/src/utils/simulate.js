import SaveClient from './saveClient';
import URLS from '../constants/urlConstants';
import { postGame } from '../redux/reducers/actions/creators';

const simulate = async (dispatch, game) => {
  const updatedGame = await SaveClient(URLS.SIMULATE_GAMES_URL, game.owner.username, game);

  await postGame(dispatch, updatedGame);
};

export default simulate;
