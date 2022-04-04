import { connect } from 'react-redux';

import PickTeam from "./pickTeam";

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    game: state.game,
    history,
  };
};

export default connect(mapStateToProps)(PickTeam);
