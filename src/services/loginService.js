const Joi = require('joi');
const loginModel = require('../models/loginModel');

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

const loginValidator = async (email, password) => {
  const invalidFields = await fieldsValidator(email, password);

  if (invalidFields) {
    return invalidFields;
  }
  const invalidLogin = await loginModel.loginValidator(email, password);

  if (invalidLogin) {
    return { 
      status: 401,  
      message: 'Incorrect username or password',
    };
  }
  return invalidLogin;
};

module.exports = { loginValidator };
