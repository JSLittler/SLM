const getTeamsRecords = table => {
  return table.map((team, index) => {
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
           <td>{name}</td>
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

const getLeagueTable = table => {
  const standings = getTeamsRecords(table);

  return (
    <div>
      <h2 id='title'>League Table</h2>
      <table id='leagueTable'>
        <thead>
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

export default getLeagueTable;
