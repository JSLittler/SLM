import Page from '../../components/page/page';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const ViewPlayer = ({
  game,
  player,
  returnPage,
  history,
  saveGame,
}) => {
  if(!player) {
    return (<div></div>);
  }
  
  const navigate = path => {
    history.push(path);
  };

  const returnToDashboard = async path => {
    await saveGame(game);

    return navigate(path);
  };
  
  return (
    <Page>
      <div className={styles.viewPlayer}>
        <h1>View Player</h1>

        <div>
          <h2 id='title'>{player.name}</h2>
          <h3>Club: {player.club}</h3>
          <h3>Positions: {player.positions.map(p => <span>{p} </span>)}</h3>
          <table id='attributes'>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Base Level</th>
                <th>Total Skill Level (Max 100)</th>
              </tr>
            </thead>
            <tbody>
              {player.attributes.map(a =>
                <tr>
                  <td>{a.attributeName}</td>
                  <td>{a.attributeBaseValue}</td>
                  <td>{a.attributeFinalValue}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p>Base Level is the lowest this player's can be rated for the attribute</p>
        <p>Total Skill Level is this player's current ability, but this will change every season</p>
        <button id={`${returnPage.title}-button`} type="submit" onClick={() => navigate(returnPage.path)} data-testid={`${returnPage.title}-button`} className={styles.button}>Return to {`${returnPage.title}`}</button>
        <button id="dashboard-button" type="submit" onClick={e => returnToDashboard(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default ViewPlayer;
