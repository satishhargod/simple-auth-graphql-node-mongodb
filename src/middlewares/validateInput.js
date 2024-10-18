const { UserInputError } = require('apollo-server');

const validateInput = (schema) => {
  return (resolverFunc) => async (parent, args, context, info) => {
    const { error } = schema.validate(args, { abortEarly: false }); // Validate all errors
    if (error) {
      const validationErrors = error.details.map(detail => ({
        message: detail.message,
        path: detail.path[0]
      }));
      throw new UserInputError('Validation Error', { validationErrors });
    }
    return resolverFunc(parent, args, context, info);
  };
};

module.exports = { validateInput };
