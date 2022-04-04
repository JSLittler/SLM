import Page from '../../components/page/page';
import { PAGES, GAME_CONSTANTS } from '../../constants';
import PlayerTable from '../../components/playerTable';

import styles from './styles.scss';

const {
  GOALKEEPERS,
  DEFENDERS,
  MIDFIELDERS,
  FORWARDS
} = GAME_CONSTANTS;

const ViewTeam = ({
  team,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  console.log(team);

  return (
    <Page>
      <div className={styles.viewTeam}>
        <h1>View Team</h1>
        <PlayerTable position={GOALKEEPERS} team={team} history={history} />
        <PlayerTable position={DEFENDERS} team={team} history={history} />
        <PlayerTable position={MIDFIELDERS} team={team} history={history} />
        <PlayerTable position={FORWARDS} team={team} history={history} />
        <button id="dashboard-button" type="submit" onClick={e => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default ViewTeam;
