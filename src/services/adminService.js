const adminModel = require('../models/adminModel');

const addAdmin = async (email, password, name, role) => {
  if (role !== 'admin') {
    return {
      status: 403,
      message: 'Only admins can register new admins',
    };
  }
  const mail = await adminModel.addAdmin(email, password, name);

  return mail;
};

module.exports = { addAdmin };
