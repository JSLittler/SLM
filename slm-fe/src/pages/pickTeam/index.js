import { connect } from 'react-redux';

import { updateFormation, updatePositionSelected } from '../../redux/reducers/actions/creators';
import PickTeam from "./pickTeam";
import save from '../../utils/save';

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
  updatePositionSelected: position => updatePositionSelected(dispatch, position),
  saveGame: game => save(dispatch, game),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeam);
