const { connection } = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connection();

  const user = await db.collection('users')
    .insertOne({ name, email, password });

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: user.insertedId,
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

const loginValidator = async (email, password) => {
  const db = await connection();
  const emailValidator = await db.collection('users')
    .findOne({ email, password });

  if (!emailValidator) {
    return emailValidator;
  }
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
