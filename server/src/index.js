require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./utils/db');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const authMiddleware = require('./utils/auth');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB().then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authMiddleware(req); // Attach user to context
    return { user };
  },
});

// Start Apollo Server
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
