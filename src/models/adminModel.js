const { connection } = require('./connection');

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

module.exports = { addAdmin };
