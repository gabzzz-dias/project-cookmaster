const Joi = require('joi');
const userModel = require('../models/userModel');

const userValidator = async (email, password, name) => {
  const { error } = Joi.object({
     email: Joi.string().email().required(),
     name: Joi.string().required(), 
     password: Joi.string().required(),
    }).validate({ email, name, password });

  if (error) {
    return error;
  }
  return false;
};

const fieldsValidator = async (email, password) => {
  const { error } = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().required(),
    }).validate({ email, password });

  if (error) {
    return {
      status: 401,
      message: 'All fields must be filled',
    };
  }
  return false;
};

const emailValidator = async (email) => {
  const mail = await userModel.getByEmail(email);

  return mail;
};

const addUser = async (email, password, name) => {
  const validate = await userValidator(email, password, name);

  if (validate) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }
  const mail = await emailValidator(email);

  if (mail) {
    return {
      status: 409,
      message: 'Email already registered',
    }; 
  }
  const newUser = await userModel.addUser(name, email, password);

  return newUser;
};

const loginValidator = async (email, password) => {
  const validate = await fieldsValidator(email, password);

  if (validate) {
    return validate;
  }
  const validateLogin = await userModel.loginValidator(email, password);

  if (!validateLogin) {
    return { 
      status: 401,  
      message: 'Incorrect username or password',
    };
  }
  return validateLogin;
};

const addAdmin = async (email, password, name, role) => {
  if (role !== 'admin') {
    return {
      status: 403,
      message: 'Only admins can register new admins',
    };
  }
  const mail = await userModel.addAdmin(email, password, name);

  return mail;
};

module.exports = { 
  addUser,
  loginValidator,
  addAdmin,
};
