import { UPDATE_SAVED_GAME } from "../../types";

export const updateSavedGame = (dispatch, savedGame) => {
  dispatch({
    type: UPDATE_SAVED_GAME,
    payload: {
      savedGame,
    },
  });
};