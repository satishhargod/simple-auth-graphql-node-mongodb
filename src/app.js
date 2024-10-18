const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./schema/authSchema');
const resolvers = require('./resolvers/authResolver');
const { handleError } = require('./errors/errorHandler');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // passing req to access headers for JWT
  formatError: (err) => handleError(err), // Catch and format errors
});

// Start the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
