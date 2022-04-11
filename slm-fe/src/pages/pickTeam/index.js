import { connect } from 'react-redux';

import { updateFormation, updatePositionSelected } from '../../redux/reducers/actions/creators';
import PickTeam from "./pickTeam";

const mapStateToProps = (state, { history }) => {
  return {
    user: state.user,
    game: state.game,
    formation: state.game.tactics.formation,
    selectedTeam: state.game.tactics.selectedTeam,
    positionSelected: state.positionSelected,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  setFormation: formation => updateFormation(dispatch, formation),
  updatePositionSelected: position => updatePositionSelected(dispatch, position)
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeam);
