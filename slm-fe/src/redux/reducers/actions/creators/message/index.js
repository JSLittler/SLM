import { UPDATE_LOGIN_MESSAGE } from "../../types";

export const updateLoginMessage = dispatch => {
  dispatch({
    type: UPDATE_LOGIN_MESSAGE,
    payload: {
      messages: {
        loginMessage: 'Incorrect Username or Password',
      },
    },
  });
};
