import { connect } from 'react-redux';

import { updatePlayer } from '../../redux/reducers/actions/creators';
import PickTeam from "./pickTeam";

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    game: state.game,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  updateViewPlayerDetails: player => updatePlayer(dispatch, player),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeam);
