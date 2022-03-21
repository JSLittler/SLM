import { findUser } from '../database/userFunctions.js';
import { findGameByUser } from '../database/gameFunctions.js';

const loginRoutes = (app) => {
  app.get('/login', async (req, res) => {
    const { username, password } = req.headers;

    if(!username && !password) {
      res.send(401,'You do not have rights to visit this page');
    }

    const { _id, name, storedPassword } = await findUser(username);

    const userDetails = {
      id: _id,
      username: name,
      loggedIn: true
    };

    const savedGame = await findGameByUser(username, _id);

    const response = {
      userDetails,
      savedGame
    };

    return storedPassword === password ? res.send(response) : res.send('incorrect username or password');
  });
};

export default loginRoutes;
