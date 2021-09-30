const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const loginController = require('../controllers/loginController');
const adminController = require('../controllers/adminController');
const imgController = require('../controllers/imgController');
const { tokenValidator } = require('../middlewares/tokenValidator');
const { multerSrvc } = require('../middlewares/multer');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static('src/uploads/'));

app.post('/users', userController.addUser);

app.post('/login', loginController.loginValidator);

app.post('/recipes', tokenValidator, recipeController.addRecipe);

app.get('/recipes', recipeController.getRecipes);

app.get('/recipes/:id', recipeController.getRecipe);

app.post('/users/admin', tokenValidator, adminController.addAdmin);

app.put('/recipes/:id', tokenValidator, recipeController.updateRecipe);

app.delete('/recipes/:id', tokenValidator, recipeController.deleteRecipe);

app.put('/recipes/:id/image',
  tokenValidator, 
  multerSrvc().single('image'),
  imgController.insertImg);

module.exports = app;
