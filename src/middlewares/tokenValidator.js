const jwt = require('jsonwebtoken');
const { findBymail } = require('../models/userModel');

const secret = 'narutinholalalala';

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const valid = jwt.verify(authorization, secret);
    const mail = await findBymail(valid.mail);

    if (!mail) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  req.user = valid;

  next();
} catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { tokenValidator };
