import arrayShuffle from 'array-shuffle';
import { randomUUID } from 'crypto';

import { getTeamNames, getFormations } from './teamFunctions.js';
import { getPlayers } from './playerFunctions.js';
import { managePlayerGames } from '../database/gameFunctions.js';
import { createLeagueTable } from './leagueFunctions.js';
import DATA_PATH_CONSTANTS from '../constants/dataPathConstants.js';

const updatePlayers = (fs) => {
 return {
    goalKeepers: arrayShuffle(getPlayers(fs, DATA_PATH_CONSTANTS.goalKeepersDataPath)),
    defenders: arrayShuffle(getPlayers(fs, DATA_PATH_CONSTANTS.defendersDataPath)),
    midfielders: arrayShuffle(getPlayers(fs, DATA_PATH_CONSTANTS.midfieldersDataPath)),
    forwards: arrayShuffle(getPlayers(fs, DATA_PATH_CONSTANTS.forwardsDataPath))
 };
};

const setupSquads = (fs) => {
  let { goalKeepers, defenders, midfielders, forwards } = updatePlayers(fs);

  const teamNames = arrayShuffle(getTeamNames(fs));

  const squads = teamNames.map(t => {
    return {
      name: t,
      squad: {
        goalKeepers: goalKeepers.splice(-2),
        defenders: defenders.splice(-5),
        midfielders: midfielders.splice(-5),
        forwards: forwards.splice(-3)
      },
      tactics: {
        formation: '',
        selectedTeam: [],
      },
      leagueRecord: {
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
      }
    }
  });

  const transferList = {
    goalKeepers,
    defenders,
    midfielders,
    forwards,
  }

  return { teams: squads, transferList };
};

const createFixtureList = (fs) => {
  const teams = arrayShuffle(getTeamNames(fs));
  const fixtures = [];

  for (let i = 1; i < teams.length; i++) {
    teams.push(teams.shift());

    const gameWeekTeams = [...teams];
    const gameWeekFixtures = {
      gameWeek: i,
      fixtures: []
    }; 

    for (let i = 0; gameWeekTeams.length > 1; i++) {
      gameWeekFixtures.fixtures.push({
        home: gameWeekTeams.shift(),
        away: gameWeekTeams.shift()
      });
    };

    fixtures.push(gameWeekFixtures);
  };

  for (let i = 1; i < teams.length; i++) {
    const gameWeekFixtures = {
      gameWeek: fixtures.length + 1,
      fixtures: fixtures[i - 1].fixtures.map(gwf => {
        return {
          home: gwf.away,
          away: gwf.home
        };
      }),
    };
    
    fixtures.push(gameWeekFixtures)
  }

  return fixtures;
};

export const setupNewGame = async (fs, username, userId) => {
  const { teams, transferList } = setupSquads(fs);
  const table = createLeagueTable([...teams]);
  const playersTeam = teams.splice(-1)[0];

  const newGame = {
    _id: randomUUID(),
    owner: {
      username,
      userId,
    },
    formations: getFormations(fs),
    playersTeam,
    oppositionTeams: [...teams],
    transferList: {
      name: 'Transfer List',
      squad: transferList,
    },
    gameWeek: 1,
    fixtures: createFixtureList(fs),
    leagueTable: table,
  };

  managePlayerGames(newGame, username, userId);

  return newGame;
};
