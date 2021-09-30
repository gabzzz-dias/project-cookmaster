const { connection } = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connection();
  const users = await db.collection('users')
  .insertOne({ name, email, password });
  return {
    user: {
      name,
      email,
      role: 'user',
      _id: users.insertedId,
    },
  };
};

const getByEmail = async (email) => {
  const db = await connection();
  const mail = await db.collection('users').findOne({ email });
  if (mail) {
    return mail;
  }
};

module.exports = {
  addUser,
  getByEmail, 
};
