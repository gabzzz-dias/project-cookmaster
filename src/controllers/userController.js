const rescue = require('express-rescue');
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

module.exports = { addUser };
