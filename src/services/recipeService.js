const Joi = require('joi');
const recipeModel = require('../models/recipeModel');

const recipeValidator = async (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(), 
    preparation: Joi.string().required(),
    }).validate({ name, ingredients, preparation });

  if (error) {
    return error;
  }
  return false;
};

const addRecipe = async (name, ingredients, preparation, userId) => {
  const validFields = await recipeValidator(name, ingredients, preparation);

  if (validFields) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    }; 
  }
  const newRecipe = await recipeModel.addRecipe(name, ingredients, preparation, userId);

  return newRecipe;
};

const getRecipes = async () => recipeModel.getRecipes();

const getRecipe = async (id) => {
  const oneRecipe = await recipeModel.getRecipe(id);

  if (!oneRecipe) {
    return {
      status: 404,
      message: 'recipe not found',
    }; 
  }
  return oneRecipe;
}; 

const updateRecipe = async (body, id, _userId) => {
  const update = await recipeModel.updateRecipe(body, id, _userId);

  return update;
};

const deleteRecipe = async (id) => {
  await recipeModel.deleteRecipe(id);
};

const insertImg = async (id, file, _userId) => recipeModel.insertImg(id, file, _userId);

module.exports = { 
  addRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  insertImg,
 };
