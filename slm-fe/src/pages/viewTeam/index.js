import { connect } from 'react-redux';

import save from '../../utils/save';
import ViewTeam from './viewTeam';


const mapStateToProps = (state, { history }) => {
  return {
    game: state.game,
    team: state.teamToView,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  saveGame: game => save(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTeam);
