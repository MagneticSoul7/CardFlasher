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
      const newDeck = await Deck.create({ title, owner: user._id });
      await User.findByIdAndUpdate(user._id, { $push: { decks: newDeck._id } });
      return newDeck;
    },
    deleteDeck: async (_, { deckId }, { user }) => {
      console.log('Delete Deck Resolver Called');
      console.log('deckId:', deckId);
      console.log('user:', user);

      if (!user) {
        console.error('Not authenticated');
        throw new Error('Not authenticated');
      }
      const deck = await Deck.findOneAndDelete({ _id: deckId, owner: user._id });
      if (!deck) {
        console.error('Deck not found or you do not have permission to delete it.');
        throw new Error('Deck not found or you do not have permission to delete it.');
      }
      
      console.log('Deleted Deck:', deck);
      return deck;
    },
  },
};
