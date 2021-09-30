const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'narutinho';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const found = await loginService.findUser(req.body);
  if (found.error) {
    const { error:
      { status, message },
    } = found;
    return res.status(status).json({ message });
  }

  const token = jwt.sign({ data: found }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
