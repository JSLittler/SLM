import { connect } from 'react-redux';

import ViewTeam from './viewTeam';


const mapStateToProps = (state, { history }) => {
  return {
    team: state.teamToView,
    history,
  };
};

export default connect(mapStateToProps)(ViewTeam);
