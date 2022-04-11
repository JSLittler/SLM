import { UPDATE_FORMATION } from "../../types";

export const updateFormation = (dispatch, formation) => {
  dispatch({
    type: UPDATE_FORMATION,
    payload: {
      formation,
    },
  });
};
