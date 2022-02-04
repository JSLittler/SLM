import { connect } from 'react-redux';
import { startNewGame } from '../../redux/reducers/actions/creators';

import SavedGames from './savedGames';

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  startNewGame: game => startNewGame(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedGames);
