const bodyParser = require('body-parser');
const express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.addUser);

app.post('/login', loginController.login);

module.exports = app;
