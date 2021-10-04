const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/userModel');

const secret = 'narutinholalalala';

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
 return res.status(401).json({ message: 'missing auth token' });
}
  try {
    const validate = jwt.verify(authorization, secret);
    const email = await getByEmail(validate.email);

    if (!email) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = validate;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { tokenValidator };
