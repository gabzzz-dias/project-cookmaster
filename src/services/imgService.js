const imgModel = require('../models/imgModel');

const insertImg = async (id, file, _userId) => imgModel.insertImg(id, file, _userId);

module.exports = { insertImg };
