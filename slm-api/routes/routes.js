// import playersRoutes from './players.js';
import loginRoutes from './login.js';
import gamesRoutes from './games.js';

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('Welcome to SLB server - please note that this is currently still in development');
  });

  loginRoutes(app);

  gamesRoutes(app, fs);

  // playersRoutes(app, fs);
};

export default appRouter;
