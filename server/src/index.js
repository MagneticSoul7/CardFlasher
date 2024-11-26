const fs = require('fs');

const path = require('path');


require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const connectDB = require('./utils/db');
const { authMiddleware } = require('./utils/auth');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  resolvers
});

// Start Apollo Server
server.start().then(() => {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  // server.applyMiddleware({ app });
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }));
  // app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
});
