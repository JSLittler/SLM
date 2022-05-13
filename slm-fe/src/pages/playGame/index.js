import { connect } from 'react-redux';

import PlayGame from "./playGame";
import save from '../../utils/save';

const mapStateToProps = (state, { history }) => {
  return {
    game: state.game,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  saveGame: game => save(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
