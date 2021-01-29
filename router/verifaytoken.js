const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(400).send('token is not valid');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.valid = verified;

    next();
  } catch (error) {
    res.status(400).send('user invalid');
  }
};
