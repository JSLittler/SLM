import { connect } from 'react-redux';

import { updatePlayer } from '../../redux/reducers/actions/creators';
import PlayerTable from "./playerTable";

const mapStateToProps = state => {
  return {
    game: state.game,
  };
};

const mapDispatchToProps = dispatch => ({
  updateViewPlayerDetails: (player, returnPage) => updatePlayer(dispatch, player, returnPage),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
