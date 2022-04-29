import { connect } from 'react-redux';

import save from '../../utils/save';
import Transfers from './transfers.jsx'

const mapStateToProps = (state, { history }) => {
  return {
    username: state.user.username,
    game: state.game,
    playersTeam: state.game.playersTeam,
    transferList: state.game.transferList,
    playerToView: state.playerToView,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  saveGame: game => save(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
