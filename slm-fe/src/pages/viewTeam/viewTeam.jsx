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
  game,
  team,
  history,
  saveGame,
}) => {
  const navigate = path => {
    history.push(path);
  };

  const returnToDashboard = async path => {
    await saveGame(game);

    return navigate(path);
  };

  return (
    <Page>
      <div className={styles.viewTeam}>
        <h1>View Team: {team.name}</h1>
        <PlayerTable position={GOALKEEPERS} team={team} history={history} returnPage={PAGES.VIEW_TEAM} />
        <PlayerTable position={DEFENDERS} team={team} history={history} returnPage={PAGES.VIEW_TEAM} />
        <PlayerTable position={MIDFIELDERS} team={team} history={history} returnPage={PAGES.VIEW_TEAM} />
        <PlayerTable position={FORWARDS} team={team} history={history} returnPage={PAGES.VIEW_TEAM} />
        <button id="dashboard-button" type="submit" onClick={e => returnToDashboard(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default ViewTeam;
