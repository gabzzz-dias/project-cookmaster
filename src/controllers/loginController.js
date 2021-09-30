const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const loginService = require('../services/loginService');

const secret = 'narutinholalalala';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
 };

const loginValidator = rescue(async (req, res) => {
  const { email, password } = req.body;
  const response = await loginService.loginValidator(email, password);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }
  const { _id, role } = response;
  const payload = { _id, role, email };
  const token = jwt.sign(payload, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = { loginValidator };
