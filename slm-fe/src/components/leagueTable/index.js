import { connect } from 'react-redux';

import LeagueTable from "./leagueTable";
import { updateTeam } from '../../redux/reducers/actions/creators';

const mapStateToProps = state => {
  return {
    game: state.game,
  };
};

const mapDispatchToProps = dispatch => ({
  updateViewTeamDetails: team => updateTeam(dispatch, team),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
