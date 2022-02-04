import { UPDATE_USER } from "../../types";

export const updateUser = (dispatch, user) => {
  dispatch({
    type: UPDATE_USER,
    payload: {
      user,
    },
  });
};
