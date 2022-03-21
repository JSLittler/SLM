import { connectToSavedGames, closeConnection } from './connections.js';

export const findGameByUser = async (username, id) => {
  try {
    const savedGamesCollection = await connectToSavedGames();
    
    const query = { owner: { username, userId: `${id}` }};
    const savedGame = await savedGamesCollection.findOne(query);

    return savedGame;
  } finally {
    await closeConnection;
  }
};

export const findSavedGame = async (id) => {
  try {
    const savedGamesCollection = await connectToSavedGames();
    
    const query = { _id: id };
    const savedGame = await savedGamesCollection.findOne(query);

    return savedGame;
  } finally {
    await closeConnection;
  }
};

export const findSavedGameIdByUser = async (username, userId) => {
  try {
    const savedGamesCollection = await connectToSavedGames();
    
    const query = { owner: {
      username,
      userId
    } };
    const savedGame = await savedGamesCollection.findOne(query);

    return savedGame._id;
  } catch(err) {
    console.log(err);
  }finally {
    await closeConnection;
  }
};

export const addSavedGame = async (savedGame) => {
  try {
    const savedGamesCollection = await connectToSavedGames();

    const result = await savedGamesCollection.insertOne(savedGame);

    if (result.insertedCount === 1) {
      return console.dir('Successfully saved game.');
    }

    return console.dir('Unable to save game.');
  } finally {
    await closeConnection();
  }
};

export const deleteSavedGame = async (gameId) => {
  try {
    const savedGamesCollection = await connectToSavedGames();
    
    const query = { _id: gameId };
    const result = await savedGamesCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      return console.dir('Successfully deleted saved game.');
    }

    return console.dir('No saved games matched the query. Deleted 0 saved games.');
  } finally {
    await closeConnection();
  }
};

export const managePlayerGames = async (game, username, userId) => {
  const previouslySavedGameId = await findSavedGameIdByUser(username, userId);

  console.log('PSG: ', previouslySavedGameId);

  if(previouslySavedGameId) {
    await deleteSavedGame(previouslySavedGameId);
  }

  await addSavedGame(game);
};
