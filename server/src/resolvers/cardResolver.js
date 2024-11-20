const Card = require('../models/card');
const Deck = require('../models/Deck');

module.exports = {
  Mutation: {
    addCard: async (_, { deckId, front, back }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const deck = await Deck.findOne({ _id: deckId, owner: user._id });
      if (!deck) {
        throw new Error('Deck not found');
      }
      const newCard = await Card.create({ front, back, deck: deck._id });
      deck.cards.push(newCard._id);
      await deck.save();
      return deck.populate('cards');
    },
  },
};
