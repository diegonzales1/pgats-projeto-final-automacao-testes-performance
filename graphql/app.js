
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// JWT middleware (clean code, error logging)
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(auth.replace('Bearer ', ''), 'supersecret');
    } catch (err) {
      req.user = null;
      console.warn('JWT inválido:', err.message);
    }
  } else {
    req.user = null;
  }
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization;
    let user = null;
    if (auth && auth.startsWith('Bearer ')) {
      try {
        user = jwt.verify(auth.replace('Bearer ', ''), 'supersecret');
      } catch (err) {
        user = null;
      }
    }
    return { user };
  }
});

async function startApollo() {
  try {
    await server.start();
    server.applyMiddleware({ app });
  } catch (err) {
    console.error('Erro ao iniciar ApolloServer:', err);
  }
}

startApollo();

module.exports = app;
