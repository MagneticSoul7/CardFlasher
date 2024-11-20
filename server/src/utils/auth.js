const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

module.exports = {
  // Function to sign a token for a user
  signToken: function ({ _id, username }) {
    const payload = { _id, username };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Middleware to verify JWT and attach user to context
  authenticate: function (token) {
    if (!token) return null;

    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
      return decoded.data; // Return user data (e.g., _id, username)
    } catch (err) {
      console.error('Invalid token:', err.message);
      return null;
    }
  },
};
