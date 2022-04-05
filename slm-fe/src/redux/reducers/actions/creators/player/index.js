import { UPDATE_PLAYER } from "../../types";

export const updatePlayer = (dispatch, player, returnPage) => {
  dispatch({
    type: UPDATE_PLAYER,
    payload: {
      player,
      returnPage,
    },
  });
};
