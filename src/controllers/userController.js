const rescue = require('express-rescue');
const userService = require('../services/userService');

const addUser = rescue(async (req, res) => {
  const result = await userService.addUsers(req.body.email, req.body.password, req.body.name);
  if (result.message) {
    return res.status(result.status).json(
      { message: result.message },
    );
  }
return res.status(201).json(result);
});

module.exports = { addUser };
