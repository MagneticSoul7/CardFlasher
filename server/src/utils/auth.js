const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Authorization header missing');
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded User:', user);
    return user.data;
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
};

const signToken = ({ _id, username }) => {
  const payload = { _id, username };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

module.exports = { authMiddleware, signToken };
