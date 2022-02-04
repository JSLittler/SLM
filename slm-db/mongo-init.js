db = db.getSiblingDB('slm');

db.createCollection('users');

db.users.insertMany(
  [
    {
      _id: 1,
      name: 'john',
      password: 'john'
    },
    {
      _id: 2,
      name: 'dave',
      password: 'dave'
    }
  ]
);
