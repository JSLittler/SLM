import { PAGES } from '../../constants';

import styles from './styles.scss';

const getTeamsRecords = (leagueTable, playersTeam, oppositionTeams, history, updateViewTeamDetails) => {
  const navigate = (path) => {
    history.push(path);
  };
  
  const viewTeam = name => {
    const team = name === playersTeam.name ? playersTeam : oppositionTeams.filter(t => t.name === name)[0];

    updateViewTeamDetails(team);
    navigate(PAGES.VIEW_TEAM.path);
  };

  return leagueTable.map((team, index) => {
    const {
      name,
      played,
      won,
      lost,
      drawn,
      goalsFor,
      goalsAgainst,
      goalDifference,
      points,
    } = team;

    const teamRecord = (
        <tr key={index}>
           <td>{index + 1}</td>
           <td><button onClick={() => viewTeam(name)} className={name === playersTeam.name ? styles.buttonSmallSelected : styles.buttonSmall}>{name}</button></td>
           <td>{played}</td>
           <td>{won}</td>
           <td>{drawn}</td>
           <td>{lost}</td>
           <td>{goalsFor}</td>
           <td>{goalsAgainst}</td>
           <td>{goalDifference}</td>
           <td>{points}</td>
        </tr>
    );

    return teamRecord;
  });
};

const LeagueTable = ({
  game,
  history,
  updateViewTeamDetails,
}) => {
  const { leagueTable, playersTeam, oppositionTeams } = game;
  
  if( !leagueTable || !playersTeam || !oppositionTeams ) {
    return (<div></div>);
  }

  const standings = getTeamsRecords(leagueTable, playersTeam, oppositionTeams, history, updateViewTeamDetails);

  return (
    <div className={styles.leagueTable}>
      <table id='leagueTable'>
      <thead>
        <tr>
          <th colSpan="10">League Table</th>
        </tr>
      <tr>
        <th>Pos</th>
        <th>Team</th>
        <th>Played</th>
        <th>Won</th>
        <th>Drawn</th>
        <th>Lost</th>
        <th>For</th>
        <th>Against</th>
        <th>Goal Diff +/-</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      {standings}
    </tbody>
  </table>
    </div>
  );
};

export default LeagueTable;
