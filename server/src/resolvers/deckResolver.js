const Deck = require('../models/Deck');
const Card = require('../models/card');
const User = require('../models/User');

module.exports = {
  Query: {
    getDecks: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return Deck.find({ owner: user._id }).populate('cards');
    },
    getDeck: async (_, { deckId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return Deck.findOne({ _id: deckId, owner: user._id }).populate('cards');
    },
  },
  Mutation: {
    createDeck: async (_, { title }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
  
      const newDeck = new Deck({
        title,
        owner: user._id,
      });
  
      await newDeck.save();
      return newDeck;
    },
    deleteDeck: async (_, { deckId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
  
      const deck = await Deck.findOneAndDelete({ _id: deckId, owner: user._id });
  
      if (!deck) {
        throw new Error('Deck not found or not authorized to delete');
      }
  
      await Card.deleteMany({ deck: deckId }); // Remove associated cards
      return deck;
    },
  },  
};
