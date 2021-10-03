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
  const invalidFields = await recipeValidator(name, ingredients, preparation);

  if (invalidFields) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    }; 
  }
  const addedRecipe = await recipeModel.addRecipe(name, ingredients, preparation, userId);

  return addedRecipe;
};

const getRecipes = async () => recipeModel.getRecipes();

const getRecipe = async (id) => {
  const recipe = await recipeModel.getRecipe(id);

  if (!recipe) {
    return {
      status: 404,
      message: 'recipe not found',
    }; 
  }

  return recipe;
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
