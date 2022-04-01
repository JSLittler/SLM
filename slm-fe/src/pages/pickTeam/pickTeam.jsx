import Page from '../../components/page/page';
import getNextGame from '../../components/nextGame/getNextGame';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const PickTeam = ({
  user,
  game,
  history,
  updateViewPlayerDetails,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  const viewPlayer = player => {
    updateViewPlayerDetails(player);
    navigate(PAGES.VIEW_PLAYER.path);
  }

  const getPlayerTable = (position) => {
    const players = position === 'Goalkeepers' ? game.playersTeam.squad.goalKeepers : game.playersTeam.squad[`${position.toLowerCase()}`];

    return (
      <div>
        <h2 id='title'>{position}</h2>
        <table id='squad'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>Positions</th>
              {position === 'Goalkeepers' && <th>Overall</th>}
              {position !== 'Goalkeepers' && <th>Defence</th>}
              {position !== 'Goalkeepers' && <th>Midfield</th>}
              {position !== 'Goalkeepers' && <th>Attack</th>}
            </tr>
          </thead>
          <tbody>
            {players.map(p => {
              return (
                <tr>
                  <td value={p.name} onClick={() => viewPlayer(p)}>{p.name}</td>
                  <td>{p.club}</td>
                  {<td>{p.positions.map(pos => <td>{pos}</td>)}</td>}
                  {position === 'Goalkeepers' && <td>{p.attributesAverages[0].attributeFinalValue}</td>}
                  {position !== 'Goalkeepers' && <td>{p.attributesAverages.filter(a => a.attributeName === 'defenceAverage')[0].attributeFinalValue}</td>}
                  {position !== 'Goalkeepers' && <td>{p.attributesAverages.filter(a => a.attributeName === 'midfieldAverage')[0].attributeFinalValue}</td>}
                  {position !== 'Goalkeepers' && <td>{p.attributesAverages.filter(a => a.attributeName === 'attackAverage')[0].attributeFinalValue}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Page>
      <h1>{user.username}, pick your team for matchday</h1>
      <div id="pick-team" data-test="pick-team" className={styles.pickTeam}>
        {getNextGame(game)}
        {getPlayerTable('Goalkeepers')}
        {getPlayerTable('Defenders')}
        {getPlayerTable('Midfielders')}
        {getPlayerTable('Forwards')}
        <button id="dashboard-button" type="submit" onClick={e => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="transfers-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default PickTeam;
