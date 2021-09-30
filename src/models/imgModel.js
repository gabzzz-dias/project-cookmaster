const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const insertImg = async (id, file, _userId) => {
  const db = await connection();
  const img = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set:
        { image: `localhost:3000/${file.path}` },
      },
      { returnOriginal: false },
    );

    return img.value;
};

module.exports = { insertImg };
