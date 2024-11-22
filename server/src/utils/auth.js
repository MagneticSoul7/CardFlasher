const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) {
    console.error('No token provided');
    return null;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Authenticated user:', user);
    return user;
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
};

module.exports = authMiddleware;
