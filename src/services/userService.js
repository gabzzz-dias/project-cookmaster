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
  const invalidLogin = await userModel.loginValidator(email, password);

  if (invalidLogin) {
    return { 
      status: 401,  
      message: 'Incorrect username or password',
    };
  }
  return invalidLogin;
};

// const addAdmin = async (email, password, name, role) => {
//   if (role !== 'admin') {
//     return {
//       status: 403,
//       message: 'Only admins can register new admins',
//     };
//   }
//   const mail = await userModel.addAdmin(email, password, name);

//   return mail;
// };

module.exports = {
  addUser,
  loginValidator,
  // addAdmin,
};
