import Page from '../../components/page/page';
import { PAGES } from '../../constants';

import styles from './styles.scss';

const ViewPlayer = ({
  player,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
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
        <button id="pickTeam-button" type="submit" onClick={() => navigate(PAGES.PICK_TEAM.path)} data-testid="pickTeam-button" className={styles.button}>Return to Pick Team</button>
        <button id="dashboard-button" type="submit" onClick={e => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default ViewPlayer;
