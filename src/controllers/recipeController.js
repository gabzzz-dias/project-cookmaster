const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const addRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;
  const response = await recipeService.addRecipe(name, ingredients, preparation, userId);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }

return res.status(201).json(response);
});

const getRecipes = rescue(async (req, res) => {
  const response = await recipeService.getRecipes();

  return res.status(200).json(response);
});

const getRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.getRecipe(id);

  if (response.message) {
    return res.status(response.status).json({ message: response.message });
  }

  return res.status(200).json(response);
});

const updateRecipe = rescue(async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const userId = req.user;
  const response = await recipeService.updateRecipe(body, id, userId);

  return res.status(200).json(response);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  await recipeService.deleteRecipe(id);

  return res.status(204).send();
});

const insertImg = rescue(async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  const userId = req.user;
  const img = await recipeService.insertImg(id, file, userId);

  return res.status(200).json(img);
});

module.exports = {
  addRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  insertImg,
};
