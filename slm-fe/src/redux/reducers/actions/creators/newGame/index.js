import { START_NEW_GAME } from "../../types";

export const startNewGame = (dispatch, game) => {
  dispatch({
    type: START_NEW_GAME,
    payload: {
      game,
    },
  });
};
