import { connect } from 'react-redux';

import { updatePlayer, updateTeamSelection } from '../../redux/reducers/actions/creators';
import PlayerTable from "./playerTable";

const mapStateToProps = state => {
  return {
    game: state.game,
    positionSelected: state.positionSelected,
    selectedTeam: state.game.tactics.selectedTeam,
  };
};

const mapDispatchToProps = dispatch => ({
  updateViewPlayerDetails: (player, returnPage) => updatePlayer(dispatch, player, returnPage),
  updateTeamSelection: (player, position) => updateTeamSelection(dispatch, player, position),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
