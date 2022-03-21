import { connect } from 'react-redux';

import GameDashboard from "./gameDashboard";

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    game: state.game,
    history,
  };
};

export default connect(mapStateToProps)(GameDashboard);
