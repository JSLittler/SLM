import { connect } from 'react-redux';

import ViewPlayer from "./viewPlayer";

const mapStateToProps = (state, { history }) => {
  return {
    player: state.playerToView,
    history,
  };
};

export default connect(mapStateToProps)(ViewPlayer);
