import { connect } from 'react-redux';

import { updatePlayer, updateTeamSelection, executeTransfer } from '../../redux/reducers/actions/creators';
import PlayerTable from "./playerTable";

const mapStateToProps = state => {
  return {
    game: state.game,
    positionSelected: state.positionSelected,
    selectedTeam: state.game.playersTeam.tactics.selectedTeam,
    playerToView: state.playerToView,
    transferList: state.game.transferList,
  };
};

const mapDispatchToProps = dispatch => ({
  updateViewPlayerDetails: (player, returnPage) => updatePlayer(dispatch, player, returnPage),
  updateTeamSelection: (player, position) => updateTeamSelection(dispatch, player, position),
  swapPlayer: (playerToAdd, playerToSwap) => executeTransfer(dispatch, playerToAdd, playerToSwap),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
