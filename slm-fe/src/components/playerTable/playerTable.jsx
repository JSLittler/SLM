import { PAGES, GAME_CONSTANTS } from '../../constants';

const { GOALKEEPERS } = GAME_CONSTANTS;

const PlayerTable = ({
  position,
  team,
  history,
  updateViewPlayerDetails,
}) => {
  const players = position === GOALKEEPERS ? team.squad.goalKeepers : team.squad[`${position.toLowerCase()}`];

  const navigate = (path) => {
    history.push(path);
  };

  const viewPlayer = player => {
    updateViewPlayerDetails(player);
    navigate(PAGES.VIEW_PLAYER.path);
  }

  return (
    <div>
      <h2 id='title'>{position}</h2>
      <table id='squad'>
        <thead>
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
                <td onClick={() => viewPlayer(p)}>{p.name}</td>
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
