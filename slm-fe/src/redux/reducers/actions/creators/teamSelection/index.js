import { UPDATE_TEAM_SELECTION } from "../../types";

export const updateTeamSelection = (dispatch, player, position) => {
  dispatch({
    type: UPDATE_TEAM_SELECTION,
    payload: {
      player,
      position,
    },
  });
};
