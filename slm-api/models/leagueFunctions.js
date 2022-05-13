export const createLeagueTable = (teams) => {
  const records = teams.map(t => {
    const {
      played,
      won,
      lost,
      drawn,
      goalsFor,
      goalsAgainst,
    } = t.leagueRecord;
    
    return {
      name: t.name,
      played,
      won,
      lost,
      drawn,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: won * 3 + drawn,
    };
  });

  const standings = records.sort(function(a, b) {
    return b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor || a.name.localeCompare(b.name);
  });

  return standings;
};
