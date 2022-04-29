import { PAGES, GAME_CONSTANTS } from '../../constants';

import styles from './styles.scss';

const { GOALKEEPERS } = GAME_CONSTANTS;

const PlayerTable = ({
  position,
  team,
  history,
  returnPage,
  positionSelected,
  updateViewPlayerDetails,
  updateTeamSelection,
  selectedTeam,
  playerToView,
  transferList,
  swapPlayer,
}) => {
  if (!team.name) {
    return (<div></div>);
  }
  const players = position === GOALKEEPERS ? team.squad.goalKeepers : team.squad[`${position.toLowerCase()}`];

  const navigate = (path) => {
    history.push(path);
  };

  const isPlayerOnTransferList = player => {
    const { goalKeepers, defenders, midfielders, forwards } = transferList.squad;
    const list = [...goalKeepers, ...defenders, ...midfielders, ...forwards];

    return list.includes(player);
  };


  const isSelected = player => {
    if (returnPage === PAGES.TRANSFERS && isPlayerOnTransferList(player)) {
      return player === playerToView;
    }

    if (returnPage !== PAGES.PICK_TEAM || !selectedTeam || Array.isArray(selectedTeam)) {
      return false;
    }

    const playerArray = [selectedTeam.goalkeeper, selectedTeam.defence, selectedTeam.midfield, selectedTeam.forwards].flat();

    return playerArray.filter(s => s.player.name === player.name).length;
  }

  const viewPlayer = player => {
    if (returnPage === PAGES.PICK_TEAM && positionSelected.length && !isSelected(player)) {
      return updateTeamSelection(player, positionSelected);
    }

    if (returnPage === PAGES.TRANSFERS && !isSelected(player) && isPlayerOnTransferList(player)) {
      return updateViewPlayerDetails(player, returnPage);
    }

    if (returnPage === PAGES.TRANSFERS && !isSelected(player) && !isPlayerOnTransferList(player)) {
      return swapPlayer(playerToView, player);
    }

    updateViewPlayerDetails(player, returnPage);
    navigate(PAGES.VIEW_PLAYER.path);
  }

  return (
    <div className={styles.playerTable}>
      <table id='squad' className={styles.table}>
        <thead>
          <tr>
            <th colSpan="6">{position}</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Club</th>
            <th>Positions</th>
            {position === GOALKEEPERS && <th>Overall</th>}
            {position !== GOALKEEPERS && <th>Defence</th>}
            {position !== GOALKEEPERS && <th>Midfield</th>}
            {position !== GOALKEEPERS && <th>Attack</th>}
          </tr>
        </thead>
        <tbody>
          {players.map(p => {
            return (
              <tr>
                <td>
                  <button onClick={() => viewPlayer(p)} className={isSelected(p) ? styles.buttonSmallSelected : styles.buttonSmall}>
                    {p.name}
                  </button>
                </td>
                <td>{p.club}</td>
                {<td>{p.positions.map(pos => <td>{pos}</td>)}</td>}
                {position === GOALKEEPERS && <td>{p.attributesAverages[0].attributeFinalValue}</td>}
                {position !== GOALKEEPERS && <td>{p.attributesAverages.filter(a => a.attributeName === 'defenceAverage')[0].attributeFinalValue}</td>}
                {position !== GOALKEEPERS && <td>{p.attributesAverages.filter(a => a.attributeName === 'midfieldAverage')[0].attributeFinalValue}</td>}
                {position !== GOALKEEPERS && <td>{p.attributesAverages.filter(a => a.attributeName === 'attackAverage')[0].attributeFinalValue}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
