import Page from '../../components/page/page';
import getNextGame from '../../components/nextGame/getNextGame';
import PlayerTable from '../../components/playerTable';
import { PAGES, GAME_CONSTANTS } from '../../constants';

import styles from './styles.scss';

const {
  GOALKEEPERS,
  DEFENDERS,
  MIDFIELDERS,
  FORWARDS
} = GAME_CONSTANTS;

const PickTeam = ({
  user,
  game,
  history,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  return (
    <Page>
      <h1>{user.username}, pick your team for matchday</h1>
      <div id="pick-team" data-test="pick-team" className={styles.pickTeam}>
        {getNextGame(game)}
        <PlayerTable position={GOALKEEPERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={DEFENDERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={MIDFIELDERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={FORWARDS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <button id="dashboard-button" type="submit" onClick={() => navigate(PAGES.GAME_DASHBOARD.path)} data-testid="transfers-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default PickTeam;
