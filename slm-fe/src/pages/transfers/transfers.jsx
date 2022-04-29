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
  game,
  playersTeam,
  transferList,
  playerToView,
  history,
  saveGame,
}) => {
  if(!transferList?.squad?.goalKeepers?.length || !playersTeam?.squad?.goalKeepers?.length) {
    return (<div></div>);
  }

  const navigate = path => {
    history.push(path);
  };

  const returnToDashboard = async path => {
    await saveGame(game);

    return navigate(path);
  };

  const isPosition = position => {
    if(!playerToView.positions?.length) {
      return false;
    }

    const positionInView = position.map(p => playerToView.positions.includes(p));
    
    return positionInView.includes(true);
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
        {isPosition(["GK"]) && <PlayerTable position={GOALKEEPERS} team={playersTeam} history={history} returnPage={PAGES.TRANSFERS} />}
        {isPosition(["RD", "CD", "LD"]) && <PlayerTable position={DEFENDERS} team={playersTeam} history={history} returnPage={PAGES.TRANSFERS} />}
        {isPosition(["RM", "CM", "LM"]) &&<PlayerTable position={MIDFIELDERS} team={playersTeam} history={history} returnPage={PAGES.TRANSFERS} />}
        {isPosition(["LF", "CF", "RF", "S"]) && <PlayerTable position={FORWARDS} team={playersTeam} history={history} returnPage={PAGES.TRANSFERS} />}
        <button id="dashboard-button" type="submit" onClick={() => returnToDashboard(PAGES.GAME_DASHBOARD.path)} data-testid="dashboard-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default Transfers;
