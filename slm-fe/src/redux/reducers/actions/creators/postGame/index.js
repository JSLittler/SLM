import { POST_GAME_SAVE } from "../../types";

export const postGame = (dispatch, game) => {
  dispatch({
    type: POST_GAME_SAVE,
    payload: game,
  });
};
