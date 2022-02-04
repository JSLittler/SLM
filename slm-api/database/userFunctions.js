import { connectToUsers, closeConnection } from './connections.js';

export const findUser = async (username) => {
  try {
    const usersCollection = await connectToUsers();
    
    const query = { name: username };
    const { _id, name, password } = await usersCollection.findOne(query);

    return {
      _id,
      name,
      storedPassword: password
    };
  } finally {
    await closeConnection;
  }
};

export const addUser = async (username, password) => {
  const newUser = {
    name: username,
    password,
  };

  const usersCollection = await connectToUsers();

  const result = await usersCollection.insertOne(newUser);

  if (result.insertedCount === 1) {
    return console.dir('Successfully added user.');
  }

  return console.dir('Unable to add user.');
};

export const deleteUser = async (username) => {
  try {
    const usersCollection = await connectToUsers();
    
    const query = { name: username };
    const result = await usersCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      return console.dir('Successfully deleted user.');
    }

    return console.dir('No users matched the query. Deleted 0 users.');
  } finally {
    await client.close();
  }
};
