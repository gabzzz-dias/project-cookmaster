const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipes.insertedId,
    },
  };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .find()
    .toArray();

  return recipes;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const recipe = await db.collection('recipes')
    .findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async (body, id, _userId) => {
  const { name, ingredients, preparation } = body;

  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const update = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) },
    { $set: {
      name,
      ingredients,
      preparation,
    },
  },
  { returnOriginal: false });

  return update.value;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
   addRecipe,
   getRecipes,
   getRecipe,
   updateRecipe,
   deleteRecipe,
};
