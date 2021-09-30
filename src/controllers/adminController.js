const rescue = require('express-rescue');
const adminService = require('../services/adminService');

const addAdmin = rescue(async (req, res) => {
  const { email, password, name } = req.body;
  const { role } = req.user;
  const response = await adminService.addAdmin(email, password, name, role);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }
  return res.status(201).json(response);
});

module.exports = { addAdmin };
