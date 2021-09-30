const connection = require('./connection');

const loginValidator = async (email, password) => {
  const db = await connection();
  const emailValidator = await db.collection('users')
    .findOne({ email, password });

  return emailValidator === null; 
};

module.exports = { loginValidator };
