const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    getLoginUser: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;