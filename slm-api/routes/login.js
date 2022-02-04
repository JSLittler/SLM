import { findUser } from '../database/userFunctions.js';

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

    return storedPassword === password ? res.send(userDetails) : res.send('incorrect username or password');
  });
};

export default loginRoutes;
