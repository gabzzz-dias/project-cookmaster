const Joi = require('joi');
const userModel = require('../models/userModel');

const userValidator = async (name, email, password) => {
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

const emailValidator = async (email) => {
  const mail = await userModel.getByEmail(email);

  return mail;
};

const addUser = async (email, password, name) => {
  const notValid = await userValidator(name, email, password);

  if (notValid) {
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
  const register = await userModel.addUser(name, email, password);

  return register;
};

module.exports = { addUser };
