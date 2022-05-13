import arrayShuffle from "array-shuffle";
import { createLeagueTable } from "./leagueFunctions.js";

export const simulateGames = game => {
  const { _id, owner, formations, playersTeam, oppositionTeams, transferList, gameWeek, fixtures } = game

  const playGame = fixture => {
    const { home, away } = fixture;

    return {
      home,
      away,
      result: { //actually simulate the game...
        [home]: 1,
        [away]: 0,
      }
    };
  };

  const updateTransfers = teams => {
    const updatedTransferList = {
      name: 'Transfer List',
      squad: {
        goalKeepers: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      },
    };
    const shuffledTeams = arrayShuffle(teams);
    ['goalKeepers', 'defenders', 'midfielders', 'forwards'].map((v, i) => {
      shuffledTeams[i].squad[v] = arrayShuffle(shuffledTeams[i].squad[v]);
      shuffledTeams[i].squad[v].push(transferList.squad[v][0]);
      updatedTransferList.squad[v].push(shuffledTeams[i].squad[v][0]);
      shuffledTeams[i].squad[v] = shuffledTeams[i].squad[v].filter(p => p.name !== updatedTransferList.squad[v][0].name);
    });

    return {
      updatedTransferList,
      updatedOppositionTeams: shuffledTeams,
    };
  };

  const updateLeagueRecord = ({ name, squad, tactics, leagueRecord: { played, won, lost, drawn, goalsFor, goalsAgainst} }, { fixtures }) => {
    const { home, away, result } = fixtures.filter(f => f.home === name || f.away === name)[0];
    const isHome = home === name;
    const isWin = isHome ? result[home] > result[away] : result[away] > result[home];
    const isDefeat = isHome ? result[home] < result[away] : result[away] < result[home];
    const isDraw = result[home] === result[away];
    return {
      name,
      squad,
      tactics,
      leagueRecord: {
        played: played + 1,
        won: isWin ? won + 1 : won,
        lost: isDefeat ? lost + 1 : lost,
        drawn: isDraw ? drawn + 1 : drawn,
        goalsFor: goalsFor + result[name],
        goalsAgainst: isHome ? result[away] : result[home],
        goalDifference: (goalsFor + result[name]) - (goalsAgainst + isHome ? result[away] : result[home]),
      }
    }
  }

  const updateFixturesWithResults = currentFixtures => {
    const gameWeekFixtures = currentFixtures[gameWeek - 1].fixtures;
    const playedGameWeekFixtures = gameWeekFixtures.map(f => playGame(f));

    currentFixtures[gameWeek - 1].fixtures = playedGameWeekFixtures;
    const currentPlayersTeam = updateLeagueRecord(playersTeam, currentFixtures[gameWeek - 1]);
    const currentOppositionTeams = oppositionTeams.map(t => updateLeagueRecord(t, currentFixtures[gameWeek - 1]));

    return {
      currentFixtures,
      currentPlayersTeam,
      currentOppositionTeams,
    };
  };

  const { currentFixtures, currentPlayersTeam, currentOppositionTeams } = updateFixturesWithResults(fixtures);
  const { updatedTransferList, updatedOppositionTeams } = updateTransfers(currentOppositionTeams);

  const updatedGame = {
    _id,
    owner,
    formations,
    playersTeam: currentPlayersTeam,
    oppositionTeams: updatedOppositionTeams,
    transferList: updatedTransferList,
    gameWeek: gameWeek + 1,
    fixtures: currentFixtures,
    leagueTable: createLeagueTable([currentPlayersTeam, ...updatedOppositionTeams]),
  };

  return updatedGame;
};
