import { UPDATE_TEAM } from "../../types";

export const updateTeam = (dispatch, team) => {
  dispatch({
    type: UPDATE_TEAM,
    payload: {
      team,
    },
  });
};
