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
  EXECUTE_TRANSFER,
  RESET_OPTIONS,
  POST_GAME_SAVE,
} from "./actions/types";

const initState = {
  user: {
    loggedIn: false,
  },
  savedGame: {},
  game: {
    formations: [],
    owner: {},
    playersTeam: {
      name: '',
      squad: {
        goalKeepers: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      },
      tactics: {
        formation: '',
        selectedTeam: [],
      },
      leagueRecord: {},
    },
    oppositionTeams: [],
    transferList: {
      name: '',
      squad: {
        goalKeepers: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      },
    },
    gameWeek: '',
    fixtures: [],
    leagueTable: [],
  },
  messages: {
    loginMessage: '',
  },
  positionSelected: '',
  playerToView: '',
  returnPage: '',
  teamToView: '',
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
        playersTeam: {
          ...state.game.playersTeam,
          tactics: {
            formation: action.payload.formation.name,
            selectedTeam: action.payload.formation.teamShape,
          },
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
        const goalkeeperIndex = state.game.playersTeam.tactics.selectedTeam.goalkeeper.findIndex(g => g.position === action.payload.position);
        const goalkeeperArray = state.game.playersTeam.tactics.selectedTeam.goalkeeper;
        goalkeeperArray[goalkeeperIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            playersTeam: {
              ...state.game.playersTeam,
              tactics: {
                ...state.game.playersTeam.tactics,
                selectedTeam: {
                  ...state.game.playersTeam.tactics.selectedTeam,
                  goalkeeper: [
                    ...goalkeeperArray
                  ]
                },
              },
            },
          },
          playerToView: '',
        };

      case "RD": case "RCD": case "CD": case "LCD": case "LD":
        const defenceIndex = state.game.playersTeam.tactics.selectedTeam.defence.findIndex(d => d.position === action.payload.position);
        const defenceArray = state.game.playersTeam.tactics.selectedTeam.defence;
        defenceArray[defenceIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            playersTeam: {
              ...state.game.playersTeam,
              tactics: {
                ...state.game.playersTeam.tactics,
                selectedTeam: {
                  ...state.game.playersTeam.tactics.selectedTeam,
                  defence: [
                    ...defenceArray
                  ]
                },
              },
            },
          },
          playerToView: '',
        };

      case "RM": case "RCM": case "CM": case "LCM": case "LM":
        const midfieldIndex = state.game.playersTeam.tactics.selectedTeam.midfield.findIndex(m => m.position === action.payload.position)
        const midfieldArray = state.game.playersTeam.tactics.selectedTeam.midfield;
        midfieldArray[midfieldIndex].player = action.payload.player;
        
        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            playersTeam: {
              ...state.game.playersTeam,
              tactics: {
                ...state.game.playersTeam.tactics,
                selectedTeam: {
                  ...state.game.playersTeam.tactics.selectedTeam,
                  midfield: [
                    ...midfieldArray
                  ]
                },
              },
            },
          },
          playerToView: '',
        };

      default:
        const forwardsIndex = state.game.playersTeam.tactics.selectedTeam.forwards.findIndex(f => f.position === action.payload.position)
        const forwardsArray = state.game.playersTeam.tactics.selectedTeam.forwards;
        forwardsArray[forwardsIndex].player = action.payload.player;

        return {
          ...state,
          positionSelected: '',
          game: {
            ...state.game,
            playersTeam: {
              ...state.game.playersTeam,
              tactics: {
                ...state.game.playersTeam.tactics,
                selectedTeam: {
                  ...state.game.playersTeam.tactics.selectedTeam,
                  forwards: [
                    ...forwardsArray
                  ]
                },
              },
            },
          },
          playerToView: '',
        };
    };
  }

  if(action.type === EXECUTE_TRANSFER) {
    const { playersTeam, transferList } = state.game;
    const { playerToAdd, playerToSwap } = action.payload;
    const playerToSwapPosition = Object.keys(playersTeam.squad).map(pos => {

      if(playersTeam.squad[pos].includes(playerToSwap)) {
        return pos;
      }

      return undefined;
    });
    
    const swapPosition = playerToSwapPosition.filter(Boolean)[0];
    const playerToSwapIndex = playersTeam.squad[swapPosition].findIndex(p => p.name === playerToSwap.name);
    playersTeam.squad[swapPosition][playerToSwapIndex] = playerToAdd;

    const playerToAddPosition = Object.keys(transferList.squad).map(pos => {
      if(transferList.squad[pos].includes(playerToAdd)) {
        return pos;
      }

      return undefined
    });

    const addPosition = playerToAddPosition.filter(Boolean)[0];
    transferList.squad[addPosition] = [playerToSwap];

    return {
      ...state,
      game: {
        ...state.game,
        playersTeam: {
          ...state.game.playersTeam,
          squad: playersTeam.squad,
        },
        transferList: {
          ...state.game.transferList,
          squad: transferList.squad,
        }
      },
      playerToView: '',
    };
  }

  if(action.type === RESET_OPTIONS) {
    return {
      ...state,
      teamToView: '',
      playerToView: '',
      positionSelected: '',
      returnPage: '',
    }
  }

  if(action.type === POST_GAME_SAVE) {
    return {
      ...state,
      game: action.payload,
      savedGame: "",
    }
  }

  return state;
};

export default rootReducer;
