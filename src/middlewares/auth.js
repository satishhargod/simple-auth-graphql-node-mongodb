const { verifyToken } = require('../utils/jwt');
const { AuthenticationError } = require('apollo-server');

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    throw new AuthenticationError('Authentication token must be provided');
  }

  try {
    return verifyToken(token);
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

module.exports = authMiddleware;
