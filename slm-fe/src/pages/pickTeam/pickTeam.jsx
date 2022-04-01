import Page from '../../components/page/page';
import getNextGame from '../../components/nextGame/getNextGame';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const PickTeam = ({
  user,
  game,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  const getKeepers = () => {
    const { goalKeepers } = game.playersTeam.squad;
  
    return (
      <div>
        <h2 id='title'>Goalkeepers</h2>
        <table id='squad'>
          <thead>
          <tr>
            <th>Name</th>
            <th>Club</th>
            <th>Position</th>
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          {goalKeepers.map(g => {
            return (
              <tr>
                <td>{g.name}</td>
                <td>{g.club}</td>
                <td>{g.positions}</td>
                <td>{g.attributesAverages[0].attributeFinalValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
  };

  const getOutfieldPlayers = (players, position) => {
  
    return (
      <div>
        <h2 id='title'>{position}</h2>
        <table id='squad'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>Positions</th>
              <th>Defence</th>
              <th>Midfield</th>
              <th>Attack</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => {
              return (
                <tr>
                  <td>{p.name}</td>
                  <td>{p.club}</td>
                  <td>{p.positions}</td>
                  <td>{p.attributesAverages.filter(a => a.attributeName === 'defenceAverage')[0].attributeFinalValue}</td>
                  <td>{p.attributesAverages.filter(a => a.attributeName === 'midfieldAverage')[0].attributeFinalValue}</td>
                  <td>{p.attributesAverages.filter(a => a.attributeName === 'attackAverage')[0].attributeFinalValue}</td>
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
        {getKeepers()}
        {getOutfieldPlayers(game.playersTeam.squad.defenders, 'Defenders')}
        {getOutfieldPlayers(game.playersTeam.squad.midfielders, 'Midfielders')}
        {getOutfieldPlayers(game.playersTeam.squad.forwards, 'Forwards')}
        <button id="dashboard-button" type="submit" onClick={e => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="transfers-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default PickTeam;
