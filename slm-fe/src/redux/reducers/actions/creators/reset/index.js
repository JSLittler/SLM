import { RESET_OPTIONS } from "../../types";

export const resetOptions = (dispatch) => {
  dispatch({
    type: RESET_OPTIONS,
    payload: {},
  });
};
