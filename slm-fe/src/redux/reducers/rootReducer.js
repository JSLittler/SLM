import {
  UPDATE_USER,
  UPDATE_SAVED_GAME,
  UPDATE_LOGIN_MESSAGE,
  START_NEW_GAME,
  UPDATE_PLAYER,
  UPDATE_TEAM,
  UPDATE_FORMATION,
  UPDATE_POSITION_SELECTED,
  UPDATE_TEAM_SELECTION,
} from "./actions/types";

const initState = {
  user: {
    loggedIn: false,
  },
  savedGame: {},
  game: {},
  messages: {
    loginMessage: '',
  },
  positionSelected: '',
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

  if(action.type === UPDATE_PLAYER) {
    return {
      ...state,
      playerToView: action.payload.player,
      returnPage: action.payload.returnPage,
    };
  }

  if(action.type === UPDATE_TEAM) {
    return {
      ...state,
      teamToView: action.payload.team,
    };
  }

  if(action.type === UPDATE_FORMATION) {
    return {
      ...state,
      game: {
        ...state.game,
        tactics: {
          formation: action.payload.formation.name,
          selectedTeam: action.payload.formation.teamShape,
        },
      },
      positionSelected: '',
    };
  }

  if(action.type === UPDATE_POSITION_SELECTED) {
    return {
      ...state,
      positionSelected: action.payload.position,
    };
  }

  if(action.type === UPDATE_TEAM_SELECTION) {
    switch(action.payload.position) {
      case "GK":
        const goalkeeperIndex = state.game.tactics.selectedTeam.goalkeeper.findIndex(g => g.position === action.payload.position);
        const goalkeeperArray = state.game.tactics.selectedTeam.goalkeeper;
        goalkeeperArray[goalkeeperIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            tactics: {
              ...state.game.tactics,
              selectedTeam: {
                ...state.game.tactics.selectedTeam,
                goalkeeper: [
                  ...goalkeeperArray
                ]
              },
            },
          },
        };

      case "RD": case "RCD": case "CD": case "LCD": case "LD":
        const defenceIndex = state.game.tactics.selectedTeam.defence.findIndex(d => d.position === action.payload.position);
        const defenceArray = state.game.tactics.selectedTeam.defence;
        defenceArray[defenceIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            tactics: {
              ...state.game.tactics,
              selectedTeam: {
                ...state.game.tactics.selectedTeam,
                defence: [
                  ...defenceArray
                ]
              },
            },
          },
        };

      case "RM": case "RCM": case "CM": case "LCM": case "LM":
        const midfieldIndex = state.game.tactics.selectedTeam.midfield.findIndex(m => m.position === action.payload.position)
        const midfieldArray = state.game.tactics.selectedTeam.midfield;
        midfieldArray[midfieldIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            tactics: {
              ...state.game.tactics,
              selectedTeam: {
                ...state.game.tactics.selectedTeam,
                midfield: [
                  ...midfieldArray
                ]
              },
            },
          },
        };

      default:
        const forwardsIndex = state.game.tactics.selectedTeam.forwards.findIndex(f => f.position === action.payload.position)
        const forwardsArray = state.game.tactics.selectedTeam.forwards;
        forwardsArray[forwardsIndex].player = action.payload.player;

        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            tactics: {
              ...state.game.tactics,
              selectedTeam: {
                ...state.game.tactics.selectedTeam,
                forwards: [
                  ...forwardsArray
                ]
              },
            },
          },
        };
    };
  }

  return state;
};

export default rootReducer;
