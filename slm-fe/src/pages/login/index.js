import { connect } from 'react-redux';

import { updateUser, updateSavedGame, updateLoginMessage } from '../../redux/reducers/actions/creators';
import Login from './login';

const mapStateToProps = (state, { history }) => {
  return {
    loginMessage: state.messages?.loginMessage,
    history,
  };
};

const mapDispatchToProps = dispatch => ({
  updateUser: user => updateUser(dispatch, user),
  updateSavedGame: savedGame => updateSavedGame(dispatch, savedGame),
  updateLoginMessage: () => updateLoginMessage(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);