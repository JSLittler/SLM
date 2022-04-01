import { UPDATE_PLAYER } from "../../types";

export const updatePlayer = (dispatch, player) => {
  dispatch({
    type: UPDATE_PLAYER,
    payload: {
      player,
    },
  });
};
