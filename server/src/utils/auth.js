const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "mysecretkey";

const authMiddleware = ({req}) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Authorization header missing');
    return req;
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, jwtSecret, { maxAge: '2h' });
    console.log('Decoded User:', user);
    req.user = user.data;
    return req;
  } catch (err) {
    console.error('Invalid token:', err.message);
    return req;
  }
};

const signToken = ({ _id, username }) => {
  const payload = { _id, username };
  return jwt.sign({ data: payload }, jwtSecret, { expiresIn: '2h' });
};

module.exports = { authMiddleware, signToken };
