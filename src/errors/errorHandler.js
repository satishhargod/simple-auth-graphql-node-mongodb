const { ApolloError } = require('apollo-server');

class AppError extends ApolloError {
  constructor(message, code, properties) {
    super(message, code, properties);
  }
}

const handleError = (err) => {
  // console.error('Error caught:', err);

  if (err.name === 'UserInputError' || err?.extensions?.code === 'BAD_USER_INPUT') {
    if(err.extensions.validationErrors){
      return new AppError(err.message, 'BAD_USER_INPUT', { details: err.extensions.validationErrors });
    }
    return new AppError(err.message, 'BAD_USER_INPUT', { details: err.message, invalidArgs: err.extensions?.invalidArgs });
  }

  if (err.name === 'AuthenticationError' || err?.extensions?.code === 'UNAUTHENTICATED') {
    return new AppError('Authentication failed', 'UNAUTHENTICATED', { details: err.message });
  }

  return new AppError('Internal Server Error', 'INTERNAL_SERVER_ERROR', { details: err.message });
};

module.exports = { AppError, handleError };
