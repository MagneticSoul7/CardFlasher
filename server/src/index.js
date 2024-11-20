require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const { authenticate } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require('./utils/db');

// Connect to MongoDB
connectDB();


// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = authenticate(token);
    return { user };
  },
});

// Apply Apollo middleware
server.start().then(() => {
  server.applyMiddleware({ app });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/card-flasher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
});
