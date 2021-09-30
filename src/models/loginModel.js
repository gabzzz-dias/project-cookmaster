const { connection } = require('./connection');

const loginValidator = async (email, password) => {
  const db = await connection();
  const emailValidator = await db.collection('users')
    .findOne({ email, password });

  if (!emailValidator) {
    return emailValidator;
  }
};

module.exports = { loginValidator };
