const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    decks: [Deck]
  }

  type Deck {
    _id: ID!
    title: String!
    cards: [Card]
    owner: User!
  }

  type Card {
    _id: ID!
    front: String!
    back: String!
    deck: Deck!
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    getDecks: [Deck]
    getDeck(deckId: ID!): Deck
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createDeck(title: String!): Deck
    addCard(deckId: ID!, front: String!, back: String!): Deck
    deleteDeck(deckId: ID!): Boolean
  }
`;

module.exports = typeDefs;
