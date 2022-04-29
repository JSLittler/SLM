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
  formation,
  selectedTeam,
  history,
  setFormation,
  updatePositionSelected,
  positionSelected,
  saveGame,
}) => {
  const navigate = (path) => {
    history.push(path);
  };

  const returnToDashboard = path => {
    saveGame(game);

    return navigate(path);
  };

  const toggleFormation = selectedFormation => {
    setFormation(selectedFormation);
  };

  const selectPosition = position => {
    positionSelected === position ? updatePositionSelected('') : updatePositionSelected(position);
  };

  const getPositionSelect = (positions, posLookup) => {
    return (
      <table className={styles.table}>
        <tr>
          {positions.map(p => {

            return (
              <td>
                <button className={p.position === positionSelected ? styles.buttonTwoLinesSelected : styles.buttonTwoLines} onClick={() => selectPosition(p.position)}>
                  <p>{p.position}</p>
                  <p>{selectedTeam[`${posLookup}`].filter(pos => pos.position === p.position)[0].player.name || 'please select'}</p>
                </button>
              </td>
            )}
          )}
        </tr>
      </table>
    );
  };

  const getPositions = () => {
    const { goalkeeper, defence, midfield, forwards } = game.formations.filter(f => f.name === formation)[0].teamShape;

    return (
      <table id='positions' className={styles.table}>
        <thead>
        <tr>
          <th colSpan="4">Select your team</th>
        </tr>
      </thead>
        <tbody>
          {getPositionSelect(goalkeeper, 'goalkeeper')}
          {getPositionSelect(defence, 'defence')}
          {getPositionSelect(midfield, 'midfield')}
          {getPositionSelect(forwards, 'forwards')}
        </tbody>
      </table>
    );
  };

  const getFormations = () => {
    const { formations } = game;

    return (
      <div>
      <table id='squad' className={styles.table}>
        <thead>
          <tr>
            <th colspan="2">Select formation</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((f, index) => {
            const isOdd = index % 2 !== 0;

            return (
              isOdd && <tr>
                <td>
                  <button
                    id={`${f.name}-button`}
                    type="submit"
                    onClick={() => toggleFormation(f)}
                    className={f.name !== formation ? styles.buttonSmall : styles.buttonSmallSelected}
                  >
                    {f.name}
                  </button>
                </td>
                <td>
                  <button
                    id={`${formations[index -1].name}-button`}
                    type="submit"
                    onClick={() => toggleFormation(formations[index -1])}
                    className={formations[index -1].name !== formation ? styles.buttonSmall : styles.buttonSmallSelected}
                  >
                    {formations[index -1].name}
                  </button>
                </td>
              </tr>
            )}
          )}
        </tbody>
      </table>
      {formation !== '' && getPositions()}
    </div>
    )
  }

  return (
    <Page>
      <h1>{user.username}, pick your team for matchday</h1>
      <div id="pick-team" data-test="pick-team" className={styles.pickTeam}>
        {getNextGame(game)}
        {getFormations()}
        {positionSelected !== '' && <p>Select a player to play {positionSelected}, by clicking on their name</p>}
        <PlayerTable position={GOALKEEPERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={DEFENDERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={MIDFIELDERS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <PlayerTable position={FORWARDS} team={game.playersTeam} history={history} returnPage={PAGES.PICK_TEAM} />
        <button id="dashboard-button" type="submit" onClick={() => returnToDashboard(PAGES.GAME_DASHBOARD.path)} data-testid="transfers-button" className={styles.button}>Return to Dashboard</button>
      </div>
    </Page>
  );
};

export default PickTeam;
