import { connect } from 'react-redux';

import GameDashboard from "./gameDashboard";
import simulate from '../../utils/simulate';

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    game: state.game,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  simulateGames: game => simulate(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDashboard);
