const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = 'narutinholalalala';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
 };

const addUser = rescue(async (req, res) => {
  const { email, password, name } = req.body;
  const response = await userService.addUser(email, password, name);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }
  return res.status(201).json(response);
});

const loginValidator = rescue(async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.loginValidator(email, password);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }
  const { _id, role } = response;
  const payload = { _id, role, email };
  const token = jwt.sign(payload, secret, jwtConfig);

  return res.status(200).json({ token });
});

const addAdmin = rescue(async (req, res) => {
  const { email, password, name } = req.body;
  const { role } = req.user;
  const response = await userService.addAdmin(email, password, name, role);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }
  return res.status(201).json(response);
});

module.exports = {
  addUser,
  loginValidator,
  addAdmin,
};
