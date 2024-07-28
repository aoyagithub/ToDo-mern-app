const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const token = await req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.body.email = decoded.email;
    return next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token, please log in' });
  }
};

module.exports = auth;
