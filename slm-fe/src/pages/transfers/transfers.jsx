import Page from '../../components/page/page';
import PlayerTable from '../../components/playerTable';
import { PAGES, GAME_CONSTANTS } from '../../constants';

import styles from './styles.scss';

const {
  GOALKEEPERS,
  DEFENDERS,
  MIDFIELDERS,
  FORWARDS
} = GAME_CONSTANTS;

const Transfers = ({
  username,
  playersTeam,
  transferList,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  return (
    <Page>
      <div id="pick-team" data-test="pick-team" className={styles.transfers}>
        <h1>Transfers</h1>
        <h2>{username}, select a player to compare or swap into your squad</h2>
        <PlayerTable position={GOALKEEPERS} team={transferList} history={history} returnPage={PAGES.TRANSFERS} />
        <PlayerTable position={DEFENDERS} team={transferList} history={history} returnPage={PAGES.TRANSFERS} />
        <PlayerTable position={MIDFIELDERS} team={transferList} history={history} returnPage={PAGES.TRANSFERS} />
        <PlayerTable position={FORWARDS} team={transferList} history={history} returnPage={PAGES.TRANSFERS} />
        <h2>{username}, select a player from your squad to swap out</h2>
        <button id="dashboard-button" type="submit" onClick={() => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default Transfers;
