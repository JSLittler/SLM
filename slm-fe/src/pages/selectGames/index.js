import { connect } from 'react-redux';
import { startNewGame } from '../../redux/reducers/actions/creators';

import SelectGames from './selectGames';

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    savedGame: state.savedGame,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  startNewGame: game => startNewGame(dispatch, game)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectGames);
