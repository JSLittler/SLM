import Page from '../../components/page/page';
import { PAGES, URLS } from '../../constants';
import ApiClient from '../../utils/apiClient';

import styles from './styles.scss';

const Login = ({
  loginMessage,
  history,
  updateUser,
  updateSavedGame,
  updateLoginMessage,
}) => {
  const proceedWithLogin = (user, savedGame, path) => {
    updateUser(user);

    savedGame ? updateSavedGame(savedGame) : updateSavedGame({});

    history.push(path);
  };

  const loginRequest = async (e) => {
    e.preventDefault();
    
    const username = e.target[0].value;
    const password = e.target[1].value;

    const { userDetails, savedGame } = await ApiClient(URLS.LOGIN_URL, username, password);

    return userDetails?.loggedIn ? proceedWithLogin(userDetails, savedGame, PAGES.SELECT_GAMES_PAGE.path) : updateLoginMessage();
  };

  return (
    <Page>
      <h1>SLM is available by invitation only.</h1>
      <h2>To play, please log into your account:</h2>
      <p id="message" data-testid="loginMessage" className={styles.message}>{loginMessage}</p>
      <form id="login-form" onSubmit={e => loginRequest(e)} className={styles.loginForm}>
        <label htmlFor="usernameInput">Username: </label>
        <input autoFocus id="usernameInput" name="username" placeholder="enter username" maxLength="10" data-testid="username" required/>
        <label htmlFor="password">Password: </label>
        <input id="password" name="password" type="enter password" placeholder="password" maxLength="10" data-testid="password" required/>
        <button id="login-button" type="submit" data-testid="login-button" className={styles.loginButton}>Login</button>
      </form>
    </Page>
  );
};

export default Login;