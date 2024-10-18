const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const authMiddleware = require('../middlewares/auth');
const { validateInput } = require('../middlewares/validateInput');
const { registerValidationSchema, loginValidationSchema } = require('../validations/validationSchemas');
const { UserInputError, AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    getLoginUser: async (_, __, { req }) => {
      const userData = authMiddleware(req);
      const user = await User.findById(userData.id);
      if (!user) throw new AuthenticationError('User not found');
      return user;
    },
  },
  Mutation: {
    register: validateInput(registerValidationSchema)(async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('User already exists', { invalidArgs: ['email'] });
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    }),

    login: validateInput(loginValidationSchema)(async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new AuthenticationError('Invalid credentials');

      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    }),
  },
};

module.exports = resolvers;
