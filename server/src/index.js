const fs = require('fs');

const path = require('path');


require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./utils/db');
const { authMiddleware } = require('./utils/auth');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process on failure
  });

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authMiddleware(req); // Attach user to context
    console.log('Context user:', user); // Debug the user attached to context
    return { user };
  },
});

// Start Apollo Server
server.start().then(() => {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
