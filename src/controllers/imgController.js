const rescue = require('express-rescue');
const imgService = require('../services/imgService');

const insertImg = rescue(async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  const userId = req.user;
  const img = await imgService.insertImg(id, file, userId);

  return res.status(200).json(img);
});

module.exports = { insertImg };
