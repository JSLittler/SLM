const getNextGame = game => {
  const gameWeekGames = game.fixtures.filter(f => f.gameWeek === game.gameWeek);
  const nextGame = gameWeekGames[0].fixtures.filter(g => g.home === game.playersTeam.name || g.away === game.playersTeam.name);

  return (
    <div>
      <h2>Next game</h2>
      <p>(HOME) {nextGame[0].home} vs {nextGame[0].away} (AWAY)</p>
    </div>
  );
};

export default getNextGame;
