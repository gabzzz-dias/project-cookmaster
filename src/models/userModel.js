const { connection } = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connection();
  const users = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });

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
  const mail = await db.collection('users')
    .findOne({ email });

  return mail !== null;
};

const loginValidator = async (email, password) => {
  const db = await connection();
  const validateEmail = await db.collection('users').findOne({ email, password });

  return validateEmail; 
};

const addAdmin = async (email, password, name) => {
  const db = await connection();
  const admin = await db.collection('users')
    .insertOne({ name, email, password, role: 'admin' });

  return {
    user: {
      name,
      email,
      role: 'admin',
      _id: admin.insertedId,
    },
  };
};

module.exports = {
  addUser,
  getByEmail, 
  loginValidator,
  addAdmin,
};
