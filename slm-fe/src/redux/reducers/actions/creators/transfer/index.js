import { EXECUTE_TRANSFER } from "../../types";

export const executeTransfer = (dispatch, playerToAdd, playerToSwap) => {
  dispatch({
    type: EXECUTE_TRANSFER,
    payload: {
      playerToAdd,
      playerToSwap,
    },
  });
};
