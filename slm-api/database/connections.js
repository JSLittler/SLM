import { default as mongodb } from 'mongodb';

const { MongoClient } = mongodb;

const connectionString = "mongodb://slm:slm@slm-mongo:27017";
const client = new MongoClient(connectionString, { useUnifiedTopology: true });

const connectToLLM = async (collection) => {
  await client.connect();
  const database = client.db('slm');

  return database.collection(collection);
}

export const connectToUsers = () => connectToLLM('users');

export const connectToSavedGames = () => connectToLLM('savedGames');

export const closeConnection = async () => await client.close();
