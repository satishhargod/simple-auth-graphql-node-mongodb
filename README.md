# simple-auth-graphql-node-mongodb

# install packages 
npm i

# Start Project
npm run dev

# Register Mutation

mutation {
  register(username: "JohnDoe", email: "john@example.com", password: "password123") {
    id
    username
    email
    token
  }
}

# Login Mutation

mutation {
  login(email: "john@example.com", password: "password123") {
    id
    username
    email
    token
  }
}

# Get login user with auth token

query {
  getLoginUser {
    id
    username
    email
    token
  }
}