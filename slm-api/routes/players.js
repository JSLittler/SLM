import { updateNewGamePlayers } from '../database/playerFunctions.js';

const playersRoutes = (app, fs) => {
  const dataPath = './data/players.json';

  app.get('/players/read', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if(err) {
        throw err;
      }
      
      const finalPlayers = updateNewGamePlayers(JSON.parse(data).playersArray);

      res.send(finalPlayers);
    });
  });
};

export default playersRoutes;
