const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

 const addUser = rescue(async (req, res) => {
  const response = await userService.addUser(req.body.email, req.body.password, req.body.name);

  if (response.message) {
    return res.status(response.status).json(
      { message: response.message },
    );
  }
  return res.status(201).json(response);
});

const secret = 'narutinholalalala';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
 };

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

// const addAdmin = rescue(async (req, res) => {
//   const { email, password, name } = req.body;
//   const { role } = req.user;
//   const response = await userService.addAdmin(email, password, name, role);

//   if (response.message) {
//     return res.status(response.status).json({ message: response.message });
//   }
//   return res.status(201).json(response);
// });

module.exports = {
  addUser,
  loginValidator,
  // addAdmin,
};
