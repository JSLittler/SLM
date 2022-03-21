import {
  UPDATE_USER,
  UPDATE_SAVED_GAME,
  UPDATE_LOGIN_MESSAGE,
  START_NEW_GAME
} from "./actions/types";

const initState = {
  user: {
    loggedIn: false,
  },
  savedGame: {},
  game: {},
  messages: {
    loginMessage: '',
  }
};

const rootReducer = (state = initState, action) => {
  if(action.type === UPDATE_USER) {
    return {
      ...state,
      user: action.payload.user
    };
  }

  if(action.type === UPDATE_SAVED_GAME) {
    return {
      ...state,
      savedGame: action.payload.savedGame
    };
  }

  if(action.type === UPDATE_LOGIN_MESSAGE) {
    return {
      ...state,
      messages: action.payload.messages,
    };
  }

  if(action.type === START_NEW_GAME) {
    return {
      ...state,
      game: action.payload.game,
      savedGame: "",
    };
  }

  return state;
};

export default rootReducer;