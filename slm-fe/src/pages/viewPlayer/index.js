import { connect } from 'react-redux';

import save from '../../utils/save';
import ViewPlayer from "./viewPlayer";

const mapStateToProps = (state, { history }) => {
  return {
    game: state.game,
    player: state.playerToView,
    returnPage: state.returnPage,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  saveGame: game => save(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlayer);
