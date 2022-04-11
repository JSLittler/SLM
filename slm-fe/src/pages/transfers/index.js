import { connect } from 'react-redux';

import Transfers from './transfers.jsx'

const mapStateToProps = (state, { history }) => {
  return {
    usernamme: state.user.username,
    playersTeam: state.game.playersTeam,
    transferList: state.game.transferList,
    history,
  };
};

export default connect(mapStateToProps)(Transfers);
