const userResolver = require('./userResolver');
const deckResolver = require('./deckResolver');
const cardResolver = require('./cardResolver');

module.exports = {
  Query: {
    ...userResolver.Query,
    ...deckResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...deckResolver.Mutation,
    ...cardResolver.Mutation,
  }
};
