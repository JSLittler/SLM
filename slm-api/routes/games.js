import { findUser } from '../database/userFunctions.js';
import { findGameByUser, findSavedGame, addSavedGame, deleteSavedGame, findSavedGameIdByUser, managePlayerGames } from '../database/gameFunctions.js';
import { setupNewGame } from '../models/newGame.js';

const gamesRoutes = (app, fs) => {
  app.get('/game/new', async (req, res) => {
    const { username, password } = req.headers;
    const { _id } = await findUser(username);

    console.log('id : ', _id);
    
    if(_id.toString() !== password) {
      return res.status(403).json({});
    }

    const newGame = await setupNewGame(fs, username, password);

    return res.send(newGame);
  });
  
  app.get('/game/allUser', async (req, res) => {
    const { username, userId } = req.body;
    const games = await findGameByUser(username) || [];

    const checkedGames = games.map(game => game.user.username === username && game.user.id === userId);

    return checkedGames.length ? res.send(checkedGames) : res.send('No saved games found');
  });

  app.get('/game/read', async (req, res) => {
    const { gameId, username, userId } = req.body;
    const game = await findSavedGame(gameId);

    const checkAuth = game.user.username === username && game.user.id === userId;

    return checkAuth ? res.send(game) : res.send('Unable to load game');
  });

  app.post('/game/save', async (req, res) => {
    const { username } = req.headers;
    const game = req.body;
    
    await managePlayerGames(game, username, game.owner.userId);

    return res.status(200).json({});
  });

  app.get('/game/delete', async (req, res) => {
    const { gameId, username, userId } = req.body;
    const oldGame = await findSavedGame(gameId);

    const checkAuth = oldGame.user.username === username && oldGame.user.id === userId;

    if(!!oldGame && checkAuth) {
      deleteSavedGame(gameId);

      return res.send('game deleted');
    }


    return res.send('Unable to delete game');
  });
};

export default gamesRoutes;
