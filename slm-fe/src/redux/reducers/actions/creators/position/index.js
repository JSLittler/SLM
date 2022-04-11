import { UPDATE_POSITION_SELECTED } from "../../types";

export const updatePositionSelected = (dispatch, position) => {
  dispatch({
    type: UPDATE_POSITION_SELECTED,
    payload: {
      position,
    },
  });
};
