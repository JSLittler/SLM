import SaveClient from './saveClient';
import URLS from '../constants/urlConstants';
import { resetOptions } from '../redux/reducers/actions/creators';

const save = async (dispatch, game) => {
  await SaveClient(URLS.SAVE_GAME_URL, game.owner.username, game);

  resetOptions(dispatch);
};

export default save;
