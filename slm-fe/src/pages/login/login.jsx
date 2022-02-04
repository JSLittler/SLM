import Page from '../../components/page/page';
import { PAGES, URLS } from '../../constants';
import ApiClient from '../../utils/apiClient';

import styles from './styles.scss';

const Login = ({
  loginMessage,
  history,
  updateUser,
  updateLoginMessage,
}) => {
  const proceedWithLogin = (user, path) => {
    updateUser(user);
    history.push(path);
  };

  const loginRequest = async (e) => {
    e.preventDefault();
    
    const username = e.target[0].value;
    const password = e.target[1].value;
    
    let user;

    try { 
      user = await ApiClient(URLS.LOGIN_URL, username, password);
    } catch(err) {
      console.log('error: ', err);
    }

    return user?.loggedIn ? proceedWithLogin(user, PAGES.SAVED_GAMES_PAGE.path) : updateLoginMessage();
  };

  return (
    <Page>
      <h2>SLM is available by invitation only.</h2>
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